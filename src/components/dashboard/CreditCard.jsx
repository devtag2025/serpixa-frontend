"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTranslation } from "@/i18n/context";

/**
 * CreditCard - Modern credit display with donut chart
 */
export default function CreditCard({ title, used, total, color, icon: Icon }) {
  const { t } = useTranslation();
  const remaining = total - used;
  const percentage = total > 0 ? Math.round((used / total) * 100) : 0;

  const data = [
    { name: "Used", value: used },
    { name: "Remaining", value: remaining },
  ];

  const COLORS = [color, "#e5e7eb"];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="p-2 rounded-xl"
            style={{ backgroundColor: `${color}15` }}
          >
            {Icon && <Icon className="w-5 h-5" style={{ color }} />}
          </div>
          <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="mb-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-900">{remaining}</span>
              <span className="text-sm text-gray-500">/ {total}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{t("dashboard.page.remaining")}</p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${percentage}%`,
                backgroundColor: color,
              }}
            />
          </div>
        </div>

        <div className="ml-4 relative w-20 h-20 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={28}
                outerRadius={36}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="text-xs font-bold"
              style={{ color }}
            >
              {percentage}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">{t("dashboard.page.used")}: {used}</span>
          <span className="text-gray-500">{t("dashboard.page.available")}: {remaining}</span>
        </div>
      </div>
    </div>
  );
}

