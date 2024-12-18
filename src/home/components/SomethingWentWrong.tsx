type SomethingWentWrongProps = {
  onButtonClick: () => void
}

export function SomethingWentWrong(props: SomethingWentWrongProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center p-6 bg-gray-100 rounded-lg shadow-md">
      <span className="text-lg text-gray-700 font-medium">
        Something went wrong!
      </span>

      <button
        onClick={() => props.onButtonClick()}
        className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
      >
        Please Retry!
      </button>
    </div>
  )
}
