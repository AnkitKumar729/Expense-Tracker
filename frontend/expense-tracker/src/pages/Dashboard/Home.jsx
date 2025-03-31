import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeperator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import { useNavigate } from "react-router-dom";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransaction from "../../components/Dashboard/ExpenseTransaction";
import Last30DaysExpenses from "../../components/Dashboard/last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

const Home = () => {
    useUserAuth();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardData = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
            setDashboardData(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load dashboard data");
            setDashboardData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <DashboardLayout activeMenu="Dashboard">
                <div className="text-center py-8">Loading dashboard...</div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout activeMenu="Dashboard">
                <div className="text-red-500 text-center py-8">{error}</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="space-y-8 p-4 md:p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Welcome Back, {dashboardData?.user?.name || "User"}
                    </h1>
                </div>

                {/* Financial Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <InfoCard
                        icon={<IoMdCard className="text-2xl" />}
                        label="Total Balance"
                        value={`${addThousandsSeperator(dashboardData?.totalBalance || 0)}`}
                        color="bg-purple-700"
                    />

                    <InfoCard
                        icon={<LuWalletMinimal className="text-2xl" />}
                        label="Total Income"
                        value={`${addThousandsSeperator(dashboardData?.totalIncome || 0)}`}
                        color="bg-orange-700"
                        textColor="text-green-700"
                    />

                    <InfoCard
                        icon={<LuHandCoins className="text-2xl" />}
                        label="Total Expense"
                        value={`${addThousandsSeperator(dashboardData?.totalExpense || 0)}`}
                        color="bg-red-700"
                        textColor="text-red-700"
                    />
                </div>

                {/* Recent Transactions Section */}
                <div className="mt-8">
                    <RecentTransactions
                        transactions={dashboardData?.recentTransactions || []}
                        onSeeMore={() => navigate("/expenses")}
                    />

                    <FinanceOverview
                       totalBalance={dashboardData?.totalBalance || 0}
                       totalIncome={dashboardData?.totalIncome || 0}
                       totalExpense={dashboardData?.totalExpense || 0}
                    /> 
                 
                     <ExpenseTransaction
                       transactions={dashboardData?.last30DaysExpenses?.transactions || []}
                       onSeeMore={() => navigate("/expenses")}
                    />

                    <Last30DaysExpenses
                      data={dashboardData?.last30DaysExpenses?.transactions || [] }
                    />
                    
                    <RecentIncomeWithChart
                       data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
                       totalIncome={dashboardData?.totalIncome || 0}
                    />
                    <RecentIncome
                        transactions={dashboardData?.last60DaysIncome?.transactions || [] }
                        onSeeMore={ () => navigate("/income")}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Home;