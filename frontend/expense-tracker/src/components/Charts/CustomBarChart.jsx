// src/components/Charts/CustomBarChart.jsx
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const CustomBarChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="category" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                    dataKey="amount" 
                    name="Expense Amount"
                    fill="#8884d8"
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CustomBarChart;