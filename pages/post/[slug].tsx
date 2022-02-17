import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { Comment } from '../../components/Comment'

interface Props {
  post: Post
}

interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

function Post({ post }: Props) {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <main>
      <Header />

      <img
        className="h-80 w-full object-cover"
        src={urlFor(post.mainImage).url()!}
      />
      <article className="mx-auto max-w-4xl p-5">
        <h1 className="mt-8 mb-3 text-3xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {post.description}
        </h2>

        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
          <p className="text-sm font-extralight">
            Post by <span className="text-green-600">{post.author.name}</span> -
            published at {new Date(post._createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-10">
          <PortableText
            className=""
            content={post.body}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            serializers={{
              p: (props: any) => <p className="my-4" {...props} />,
              h1: (props: any) => (
                <h1 className="my-4 text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="my-4 text-xl font-bold" {...props} />
              ),
              li: (props: any) => <li className="ml-4 list-disc" {...props} />,
              ul: (props: any) => <ul className="m-4" {...props} />,
              link: ({ href, children }: any) => (
                <a href={href} className="text-green-500 hover:underline">
                  {children}
                </a>
              ),
              blockquote: (props: any) => (
                <p className="my-4 bg-slate-800 p-4 text-white" {...props} />
              ),
              span: (props: any) => (
                <span className="text-green-500" {...props} />
              ),
            }}
          />
        </div>
      </article>

      {post.comments.length !== 0 && (
        <>
          <div className="mx-auto max-w-4xl">
            <hr className="border-0.5 m-5 mx-5 border-gray-300" />
          </div>

          <div className="my-10 mx-auto max-w-2xl p-5">
            <h3 className="mb-4 text-3xl font-bold">
              Comments ({post.comments.length})
            </h3>
            {post.comments.map((item) => (
              <Comment
                key={item._id}
                name={item.name}
                comment={item.comment}
                _createdAt={item._createdAt}
              />
            ))}
          </div>
        </>
      )}

      <div className="mx-auto max-w-4xl">
        <hr className="border-0.5 m-5 mx-5 border-gray-300" />
      </div>

      {submitted ? (
        <div className="my-10 mx-auto flex max-w-2xl flex-col bg-yellow-500 p-10 text-white">
          <h3 className="text-3xl font-semibold">
            Thanks for submitting your comment.
          </h3>
          <p>Once it has been approved, it will show</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mb-10 flex max-w-2xl flex-col p-5"
        >
          <h4 className="text-sm text-yellow-500">Enjoyed this article?</h4>
          <h3 className="mb-4 text-3xl font-bold">Leave a comment</h3>

          <input
            type="hidden"
            {...register('_id')}
            name="_id"
            value={post._id}
          />

          <label className="mb-5 block">
            <div className="flex space-x-2">
              <p className="text-gray-700">Name</p>
              {errors.name && (
                <p className="font-semibold text-red-500">
                  - Name field is required!
                </p>
              )}
            </div>
            <input
              className={`form-input mt-1 block w-full rounded border py-2 px-3 shadow focus:outline-yellow-500 ${
                errors.name && 'border-2 border-red-500'
              }`}
              placeholder="John Doe"
              {...register('name', { required: true })}
              type="text"
            />
          </label>
          <label className="mb-5 block">
            <div className="flex space-x-2">
              <p className="text-gray-700">Email</p>
              {errors.email && (
                <p className="inline-flex font-semibold text-red-500">
                  - Email field is required!
                </p>
              )}
            </div>
            <input
              className={`form-input mt-1 block w-full rounded border py-2 px-3 shadow focus:outline-yellow-500 ${
                errors.email && 'border-2 border-red-500'
              }`}
              placeholder="john.doe@gmail.com"
              {...register('email', { required: true })}
              type="email"
            />
          </label>
          <label className="mb-5 block">
            <div className="flex space-x-2">
              <p className="text-gray-700">Comment</p>
              {errors.comment && (
                <p className="inline-flex font-semibold text-red-500">
                  - Comment field is required!
                </p>
              )}
            </div>
            <textarea
              className={`form-textarea mt-1 block w-full rounded border py-2 px-3 shadow focus:outline-yellow-500 ${
                errors.comment && 'border-2 border-red-500'
              }`}
              placeholder="Your comment here"
              {...register('comment', { required: true })}
              rows={8}
            />
          </label>

          <input
            type="submit"
            value="Send"
            className="focus:shadow-outline cursor-pointer rounded bg-yellow-500 px-3 py-2 font-bold text-white shadow hover:bg-yellow-400 focus:outline-none"
          />
        </form>
      )}
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
    current
  }
  }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((item: Post) => ({
    params: {
      slug: item.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author-> {
      name,
      image
    },
    'comments': *[
      _type == 'comment' &&
      post._ref == ^._id &&
      approved == true],
    description,
    mainImage,
    slug,
    body
    }`

  const post = await sanityClient.fetch(query, {
    slug: params!.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
