type FilterProps = {
  onFilterChange: (selectedFilterCriteria: string) => void
  categories: string[]
}

function Filter({ categories, onFilterChange }: FilterProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700 whitespace-nowrap"
      >
        Filter by Category
      </label>
      <select
        id="category"
        onChange={(event) => onFilterChange(event.target.value)}
        className="md:ml-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Filter
