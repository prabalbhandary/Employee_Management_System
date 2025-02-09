import React from 'react'

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="rounded flex flex-col sm:flex-row bg-white shadow-lg p-4">
      <div className={`text-3xl flex justify-center items-center ${color} text-white p-3 rounded-lg sm:mr-4 mb-4 sm:mb-0`}>
        {icon}
      </div>
      <div className="text-center sm:text-left">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-xl font-bold">{number}</p>
      </div>
    </div>
  )
}

export default SummaryCard
