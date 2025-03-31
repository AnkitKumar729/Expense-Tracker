import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

// Default color palette for the pie chart
const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6666'];

const CustomPieChart = ({ data, label, totalAmount, colors = DEFAULT_COLORS, showTextAnchor }) => {
    return (
        <ResponsiveContainer width="100%" height={380}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={90}  // Changed to create visible ring
                    labelLine={false}
                    paddingAngle={2} // Add space between segments
                >
                    {data.map((entry, index) => (
                        <Cell 
                            key={`cell-${index}`} 
                            fill={colors[index % colors.length]} 
                            stroke="#ffffff" // White border for contrast
                            strokeWidth={2}
                        />
                    ))}
                </Pie>
                <Tooltip 
                
                    content={CustomTooltip}
                />
                <Legend 
                   content={CustomLegend}
                />
                {showTextAnchor && (
                    <>
                        <text
                            x="50%"
                            y="50%"
                            dy={-25}
                            textAnchor="middle"
                            fill="#4a4a4a"
                            fontSize="16px"
                            fontWeight={500}
                        >
                            {label}
                        </text>
                        <text
                            x="50%"
                            y="50%"
                            dy={8}
                            textAnchor="middle"
                            fill="#2c3e50"
                            fontSize="28px"
                            fontWeight={600}
                        >
                            ${totalAmount}
                        </text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;