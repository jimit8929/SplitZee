"use client";

import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ExpenseSummary } from "./components/expense-summary";
import { BalanceSummary } from "./components/balance-summary";
import { GroupList } from "./components/group-list";

export default function Dashboard() {
  const { data: balances, isLoading: balancesLoading } = useConvexQuery(
    api.dashboard.getUserBalances
  );
  const { data: groups, isLoading: groupsLoading } = useConvexQuery(
    api.dashboard.getUserGroups
  );
  const { data: totalSpent, isLoading: totalSpentLoading } = useConvexQuery(
    api.dashboard.getTotalSpent
  );
  const { data: monthlySpending, isLoading: monthlySpendingLoading } =
    useConvexQuery(api.dashboard.getMonthlySpending);

  const isLoading =
    balancesLoading ||
    groupsLoading ||
    totalSpentLoading ||
    monthlySpendingLoading;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <BarLoader width="100%" color="#36d7b7" />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-5xl font-semibold">Dashboard</h1>
            <Button asChild>
              <Link
                href="/expenses/new"
                className="inline-flex items-center px-4 py-2"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Add expense
              </Link>
            </Button>
          </div>

          {/* Top summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold">
                  {balances?.totalBalance > 0 ? (
                    <span className="text-green-600">
                      +${balances.totalBalance.toFixed(2)}
                    </span>
                  ) : balances?.totalBalance < 0 ? (
                    <span className="text-red-600">
                      -${Math.abs(balances.totalBalance).toFixed(2)}
                    </span>
                  ) : (
                    <span>$0.00</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {balances.totalBalance > 0
                    ? "You are owed money"
                    : balances.totalBalance < 0
                    ? "You owe money"
                    : "All settled up!"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  You are owed
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-green-600">
                  ${balances.youAreOwed.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  From {balances.oweDetails.youAreOwedBy.length} people
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  You owe
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {balances.oweDetails.youOwe.length > 0 ? (
                  <>
                    <div className="text-2xl font-bold text-red-600">
                      ${balances.youOwe.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      To {balances.oweDetails.youOwe.length} people
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold">$0.00</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      You don't owe anyone
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main dashboard content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2">
              <ExpenseSummary
                monthlySpending={monthlySpending}
                totalSpent={totalSpent}
              />
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Balance details */}
              <Card>
                <CardHeader className="pb-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Balance Details</CardTitle>
                    <Button variant="link" asChild className="p-0">
                      <Link
                        href="/contacts"
                        className="inline-flex items-center"
                      >
                        View all
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <BalanceSummary balances={balances} />
                </CardContent>
              </Card>

              {/* Groups */}
              <Card>
                <CardHeader className="pb-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Your Groups</CardTitle>
                    <Button variant="link" asChild className="p-0">
                      <Link
                        href="/contacts"
                        className="inline-flex items-center"
                      >
                        View all
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <GroupList groups={groups} />
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    variant="outline"
                    asChild
                    className="w-full"
                  >
                    <Link
                      href="/contacts?createGroup=true"
                      className="inline-flex items-center justify-center px-4 py-2"
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Create new group
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
