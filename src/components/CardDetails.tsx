export default function CardDetails({cardDetails}:{cardDetails:any}){
    return(
        <>
          <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-lg font-semibold mb-1">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="number"
            value={cardDetails.number}
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-600"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cvv" className="block text-lg font-semibold mb-1">CVV</label>
          <input
            type="number"
            id="cvv"
            name="cvv"
            value={cardDetails.cvv}
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-600"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="cardName" className="block text-lg font-semibold mb-1">
            Name on Card
          </label>
          <input
            type="text"
            id="cardName"
            name="name"
            value={cardDetails.name}
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-600"
            readOnly
          />
        </div>
        </>
    )
}