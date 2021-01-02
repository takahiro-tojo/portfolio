import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.scss'

export default function WorksId({ works }) {
  return (
    <div className={styles.main_container}>
      <Head>
        <meta name="robots" content="noindex" />
        <title>PORTFOLIO | {works.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.works_container}>
        <div className={styles.works_tag}>
          <p className={styles.works_tag__name}>{works.tags && `${works.tags.name}`}</p>
        </div>
        <h1 className={styles.works_ttl}>{works.title}</h1>
        <img className={styles.works_img} src={works.image.url} alt="{works.title}"/>
        <a href={works.link} className={styles.works_url} target="_blank">{works.link}</a>

        <div
          dangerouslySetInnerHTML={{
            __html: `${works.body}`,
          }}
          className={styles.post}
        />
        <Link href="/">
          <a className={styles.works_btn}>一覧へ戻る</a>
        </Link>
      </div>
      <footer className={styles.footer}>
        <p className={styles.copyright}>© 2021 Takahiro Tojo</p>
      </footer>
    </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch('https://portfolio1003.microcms.io/api/v1/works', key)
    .then(res => res.json())
    .catch(() => null);
  const paths = data.contents.map(content => `/works/${content.id}`);
  return {paths, fallback: false};
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async context => {
  const id = context.params.id;
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };
  const data = await fetch(
    'https://portfolio1003.microcms.io/api/v1/works/' + id,
    key,
  )
    .then(res => res.json())
    .catch(() => null);
  return {
    props: {
      works: data,
    },
  };
};