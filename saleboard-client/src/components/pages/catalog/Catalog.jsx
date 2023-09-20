import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AdService } from '../../../services/ad.service.js'
import { AdCard } from '../../layout/adCard/AdCard.jsx'
import { Pagination, Stack } from '@mui/material'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const Catalog = ({ category, authorId }) => {
  const [pageAmount, setPageAmount] = useState(0)
  const [page, setPage] = useState(1)
  const [searchParams] = useSearchParams()

  const query = searchParams.get('query') || ' '

  const queryClient = useQueryClient()

  const { data } = useQuery(
    ['ads', page, query],
    () => AdService.getAdsByAuthorId(authorId, page, query),
    {
      onSuccess: (data) => {
        setPageAmount(Math.ceil(data.amount / 3))
      },
    }
  )

  const handlePageChange = (newPage) => {
    setPage(newPage)
    queryClient.invalidateQueries(['ads'])
  }

  return (
    <div>
      {category && <div>{category}</div>}
      <div style={{ display: 'flex', flexFlow: 'column', gap: '10px' }}>
        {data?.amount
          ? data?.ads.map((ad) => (
              <AdCard
                key={ad.id}
                id={ad.id}
                title={ad.title}
                img={ad.images}
                price={ad.price}
                description={ad.description}
                authorName={ad.author?.name ? ad.author.name : ''}
              ></AdCard>
            ))
          : 'Ничего не найдено'}
      </div>
      <Stack spacing={2}>
        {!!pageAmount && (
          <Pagination
            count={pageAmount}
            page={page}
            onChange={(_, num) => handlePageChange(num)}
          />
        )}
      </Stack>
    </div>
  )
}
