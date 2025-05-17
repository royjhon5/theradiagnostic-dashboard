export default function QueueDisplay() {
  return (
    <div className="bg-gray-900 p-6 w-full max-w-4xl mx-auto text-white font-sans">
      <div className="grid grid-cols-2 gap-4">
        {/* Now Serving Section */}
        <div className="bg-blue-900 p-4 rounded-lg">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-blue-900 font-semibold">Now Serving</div>
            <div className="text-blue-700 text-6xl font-bold my-2">P1048</div>
            <div className="text-blue-900 font-semibold">Counter 10</div>
          </div>
        </div>

        {/* Empty space */}
        <div className="bg-gray-800 rounded-lg"></div>

        {/* Bottom row of counters */}
        <div className="col-span-2 grid grid-cols-4 gap-4 mt-4">
          <div className="bg-gray-800 p-3 rounded-lg text-center">
            <div className="text-yellow-400 text-2xl font-bold">S5104</div>
            <div className="text-gray-300 text-sm">Counter 7</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg text-center">
            <div className="text-yellow-400 text-2xl font-bold">B6031</div>
            <div className="text-gray-300 text-sm">Counter 6</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg text-center">
            <div className="text-yellow-400 text-2xl font-bold">S5102</div>
            <div className="text-gray-300 text-sm">Counter 9</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg text-center">
            <div className="text-yellow-400 text-2xl font-bold">B6029</div>
            <div className="text-gray-300 text-sm">Counter 5</div>
          </div>
        </div>

        {/* Forex rates section */}
        <div className="col-span-2 bg-gray-800 p-3 rounded-lg mt-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-300 text-sm">
              Forex Rates for Notes
              <div className="text-xs text-gray-400">
                Indicative as of 05/09/2025, 09:00 PM
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-700 px-2 py-1 rounded">USD</div>
              <div className="flex flex-col">
                <div className="text-sm">BUY (PHP): 55.2500</div>
                <div className="text-sm">SELL (PHP): 55.7500</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
