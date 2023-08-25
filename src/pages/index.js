import { Inter } from 'next/font/google'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import PageLayout from '../../components/PageLayout'

const inter = Inter({ subsets: ['latin'] })

export default function Home ({ articles }) {

  return (
    <PageLayout title='NewsApp - Home'>
      <div className={styles.container}>
        {articles.length === 0 && <h1>No tenemos artículos</h1>}
        {articles.length > 0 && articles.map((article, index) => {
          return (
            <article key={index} >
              <Image quality={50} priority={index < 2} height={300} width={450} layout='responsive' alt={`Image from the article ${article.title}`} src={article.urlToImage} />
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </article>
          )
        })}
      </div>
    </PageLayout>
  )
}

export async function getStaticProps () {
  const response = await fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=0d32bb7f56934b7e81f75c51c34982aa')
  const { articles } = await response.json()
  return {
    props: {
      articles
    }
  }
}
