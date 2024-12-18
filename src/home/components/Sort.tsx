type SortProps = {
  onSortChange: (selectedSortCriteria: string) => void
  options: string[]
}

function Sort(props: SortProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center mb-2 md:mb-0">
      <label
        htmlFor="sort"
        className="block text-sm font-medium text-gray-700 whitespace-nowrap"
      >
        Sort by
      </label>

      <select
        id="sort"
        onChange={(event) => props.onSortChange(event.target.value)}
        className="md:ml-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      >
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Sort
