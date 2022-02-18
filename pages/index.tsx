import Head from 'next/head'
import { Banner } from '../components/Banner'
import { Card } from '../components/Card'
import Header from '../components/Header'
import { sanityClient } from '../sanity'
import { Post } from '../typings'

interface Props {
  posts: Post[]
}

export default function Home({ posts }: Props) {
  console.log(posts)
  return (
    <div>
      <Head>
        <title>WAWA React</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      <div className="p-5">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {posts.map((item) => (
            <Card
              key={item._id}
              slug={item.slug}
              mainImage={item.mainImage}
              title={item.title}
              description={item.description}
              categories={item.categories}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] | order(_createdAt desc){
    _id,
    title,
    author -> {
    name,
    image
  },
    description,
    mainImage,
    slug,
    categories[]->{name, color},
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
