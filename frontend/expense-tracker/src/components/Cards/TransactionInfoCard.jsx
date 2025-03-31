import React from "react";
import {
    LuUtensils,
    LuTrendingUp,
    LuTrendingDown,
    LuTrash
} from "react-icons/lu";

const TransactionInfoCard = ({
    title,
    icon,
    date,
    amount,
    type,
    hideDeleteBtn,
    onDelete // Added missing prop
}) => {
    const getAmountStyles = () => 
        type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";

    return (
        <div className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60 transition-colors">
            {/* Icon Section */}
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
                {icon ? (
                    <img 
                        src={icon} 
                        alt={title} 
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    <LuUtensils className="w-6 h-6 text-gray-500" />
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-between">
                {/* Text Content */}
                <div>
                    <p className="text-sm font-medium text-gray-800">{title}</p>
                    <p className="text-xs text-gray-400 mt-1">
                        {new Date(date).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </p>
                </div>

                {/* Amount and Actions */}
                <div className="flex items-center gap-2">
                    {/* Delete Button */}
                    {!hideDeleteBtn && (
                        <button 
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                            onClick={onDelete}
                            aria-label="Delete transaction"
                        >
                            <LuTrash className="w-4 h-4" />
                        </button>
                    )}

                    {/* Amount Display */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                        <span className="text-sm font-medium">
                            {type === "income" ? "+" : "-"}₹{amount} {/* Changed $ to ₹ */}
                        </span>
                        {type === "income" ? (
                            <LuTrendingUp className="w-4 h-4" />
                        ) : (
                            <LuTrendingDown className="w-4 h-4" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;