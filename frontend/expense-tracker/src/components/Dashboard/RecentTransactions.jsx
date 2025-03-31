import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from 'moment';
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-medium">Recent Transactions</h5>
                <button 
                    className="card_btn flex items-center gap-1"
                    onClick={onSeeMore}
                >
                    See All <LuArrowRight className="text-sm" />
                </button>
            </div>

            <div className="mt-4 space-y-3">
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        title={item.type === 'expense' ? item.category : item.source}
                        icon={item.icon}
                        date={moment(item.date).format("DD MMM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
                
                {/* Empty State */}
                {transactions?.length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-4">
                        No transactions found
                    </p>
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;