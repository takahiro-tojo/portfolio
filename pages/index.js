// pages/index.js
import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Home.module.scss'

export default function Home({ works }) {
  return (
    <div className={styles.main_container}>
      <Head>
        <meta name="robots" content="noindex" />
        <title>PORTFOLIO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.about_container}>
        <h1 className={styles.works_ttl}>ABOUT</h1>
        <div className={styles.works_body}>
          <p className={styles.works_desc}>現状のHPはサポート部署の対応により一部制作時から変更されている可能性がございます。</p>
          <p className={styles.works_desc}>画像をクリックするとプロジェクトの詳細ページに飛びます。</p>
        </div>
      </div>
      <div className={styles.works_container}>
        <h1 className={styles.works_ttl}>WORKS</h1>
        <ul className={styles.works_list}>
          {works.map(works => (
            <li key={works.id} className={styles.works_list__item}>
              <div className={styles.works_tag}>
                <p className={styles.works_tag__name}>{works.tags && `${works.tags.name}`}</p>
              </div>
              <Link href={`works/${works.id}`}>
              <a className={styles.works_list__item__link}><img src={works.image.url}/></a>
              </Link>
              <h2 className={styles.works_name}>{works.title}</h2>
              <a href={works.link} className={styles.works_url} target="_blank">{works.link}</a>
              
            </li>
          ))}
        </ul>
      </div>
      <footer className={styles.footer}>
        <p className={styles.copyright}>© 2021 Takahiro Tojo</p>
      </footer>
    </div>
  )
}



// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch('https://portfolio1003.microcms.io/api/v1/works?orders=publishedAt', key)
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      works: data.contents,
    },
  };
};