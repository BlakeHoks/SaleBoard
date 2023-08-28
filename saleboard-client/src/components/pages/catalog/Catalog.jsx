import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AdService } from '../../../services/ad.service.js'
import { AdCard } from '../../layout/adCard/AdCard.jsx'
import { Pagination, Stack } from '@mui/material'
import { useState } from 'react'

export const Catalog = ({ category }) => {
  const [pageAmount, setPageAmount] = useState(0)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState(' ')

  const queryClient = useQueryClient()

  const { data } = useQuery(
    ['ads', page],
    () => AdService.getAds(category, page, query),
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
      <div>{category}</div>
      <div style={{ display: 'flex', flexFlow: 'column', gap: '10px' }}>
        {data?.ads.map((ad) => (
          <AdCard
            key={ad.id}
            id={ad.id}
            title={ad.title}
            img={ad.images}
            price={ad.price}
            description={ad.description}
            authorName={ad.author.name}
          ></AdCard>
        ))}
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
