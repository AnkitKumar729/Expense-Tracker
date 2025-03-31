import React, { useState } from 'react';
import Input from "../Inputs/Input";
import EmojiPickerPopup from '../EmojiPickerPopup';
import toast from 'react-hot-toast';

const AddIncomeForm = ({ onAddIncome }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, value) => setIncome(prev => ({
        ...prev,
        [key]: value
    }));

    const handleSubmit = () => {
        // Validation checks
        if (!income.source.trim()) {
            toast.error("Income source is required");
            return;
        }
        if (!income.amount || isNaN(income.amount) || Number(income.amount) <= 0) {
            toast.error("Amount must be a valid number greater than 0");
            return;
        }
        if (!income.date) {
            toast.error("Date is required");
            return;
        }
        
        onAddIncome(income);
    };

    return (
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />
            
            <Input
                value={income.source}
                onChange={(value) => handleChange("source", value)}
                label="Income Source"
                placeholder="Freelance, Salary, e.t.c"
                type="text"
            />

            <Input
                value={income.amount}
                onChange={(value) => handleChange("amount", value)}
                label="Amount"
                placeholder=""
                type="number"
            />

            <Input
                value={income.date}
                onChange={(value) => handleChange("date", value)}
                label="Date"
                placeholder=""
                type="date"
/>

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={handleSubmit}
                >
                    Add Income
                </button>
            </div>
        </div>
    );
};

export default AddIncomeForm;