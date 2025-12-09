import { StatsCard } from "@/components/ui/core/imageUpload/states.card";
import { DollarSign, ShoppingCart, Users } from "lucide-react";

const page = () => {
  return (
    <div className="grid grid-cols-4  gap-3 px-6">
      <StatsCard
        title="Total Revenue"
        value="$45,231.89"
        description="+20.1% from last month"
        icon={DollarSign}
        iconColor="text-green-600"
        iconBgColor="bg-green-100"
        trend={{ value: 20.1, isPositive: true }}
      />

      <StatsCard
        title="Total Users"
        value="2,350"
        description="+180 new users this week"
        icon={Users}
        iconColor="text-blue-600"
        iconBgColor="bg-blue-100"
        trend={{ value: 15.3, isPositive: true }}
      />

      <StatsCard
        title="Orders"
        value="1,234"
        description="-4.3% from last month"
        icon={ShoppingCart}
        iconColor="text-purple-600"
        iconBgColor="bg-purple-100"
        trend={{ value: 4.3, isPositive: false }}
      />
      <StatsCard
        title="Orders"
        value="1,234"
        description="-4.3% from last month"
        icon={ShoppingCart}
        iconColor="text-purple-600"
        iconBgColor="bg-purple-100"
        trend={{ value: 4.3, isPositive: false }}
      />
    </div>
  );
};
export default page;
