interface props{
  title: string,
  description:string,
  price: number,
  author: string
}

export default function CourseDetails({courseDetails}:{courseDetails:props}){
    return(
        <>
        <label htmlFor="title" className="block text-lg font-semibold mb-1">
          Title :
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={courseDetails.title}
          className="mb-2 w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-600"
          readOnly
        />

        <label htmlFor="description" className="block text-lg font-semibold mb-1">
          Description :
        </label>
        <textarea
          id="description"
          name="description"
          value={courseDetails.description}
          className="mb-2 w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-600"
          readOnly
        />

        <label htmlFor="price" className="block text-lg font-semibold mb-1">
          Price :
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={courseDetails.price}
          className="mb-2 text-orange-600 w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:border-indigo-500"
          readOnly
        />

        <label htmlFor="author" className="block text-lg font-semibold mb-1">
          Author :
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={courseDetails.author}
          className="mb-2 w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-600"
          readOnly
        />
        </>
    )
}