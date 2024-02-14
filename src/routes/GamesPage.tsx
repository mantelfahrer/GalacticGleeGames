import React, { FC } from 'react'
import Layout from '../components/Layout'
import Games from '../components/Games'

type Props = {}

const GamesPage: FC<Props> = (props: Props) => {
  return (
    <Layout>
        <Games />
    </Layout>
  )
}

export default GamesPage