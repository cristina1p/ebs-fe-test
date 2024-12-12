import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex flex-grow items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-red-600">404</h1>
        <p className="text-2xl mt-2">Oops! Page not found.</p>
        <p className="text-lg mt-4">
          The page you are looking for might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
