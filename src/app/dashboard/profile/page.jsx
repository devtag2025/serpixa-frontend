"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { useDashboard } from "@/hooks/useDashboardStats";
import { useTranslation } from "@/i18n/context";
import { HiUser, HiMail, HiShieldCheck, HiXCircle, HiCreditCard, HiCalendar } from "react-icons/hi";

export default function ProfilePage() {
  const { data: user, isLoading: isAuthLoading } = useAuth();
  const { t } = useTranslation();
  const {
    credits,
    subscriptionInfo,
    isLoading: isDashboardLoading,
  } = useDashboard(t);

  const isLoading = isAuthLoading || isDashboardLoading;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
          <div className="text-center">
            <p className="text-gray-600">User not found</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-full">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {t("dashboard.profile.page.title") || "Profile"}
            </h1>
            <p className="mt-2 text-gray-600">
              {t("dashboard.profile.page.subtitle") || "Manage your account information and preferences"}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <HiUser className="w-5 h-5 text-primary" />
                  {t("dashboard.profile.page.personalInfo") || "Personal Information"}
                </h2>

                <div className="space-y-4">
                  {/* Profile Avatar/Initial */}
                  <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      {user.picture ? (
                        <img
                          src={user.picture}
                          alt={user.name || user.email}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-primary font-bold text-2xl">
                          {user.name?.charAt(0).toUpperCase() ||
                            user.email?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {user.name || "No name set"}
                      </h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex w-full">
                    {/* Name */}
                    <div className="flex w-full items-center gap-3 py-3 border-b border-gray-100">
                      <HiUser className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">{t("dashboard.profile.page.name") || "Name"}</p>
                        <p className="text-base font-medium text-gray-900">
                          {user.name || "Not set"}
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex w-full items-center gap-3 py-3 border-b border-gray-100">
                      <HiMail className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">{t("dashboard.profile.page.email") || "Email"}</p>
                        <p className="text-base font-medium text-gray-900">{user.email}</p>
                      </div>
                    </div>

                    {/* Email Verification Status */}
                    <div className="flex w-full items-center gap-3 py-3">
                      {user.is_email_verified ? (
                        <>
                          <HiShieldCheck className="w-5 h-5 text-green-500" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-500">
                              {t("dashboard.profile.page.emailStatus") || "Email Status"}
                            </p>
                            <p className="text-base font-medium text-green-600">
                              {t("dashboard.profile.page.verified") || "Verified"}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <HiXCircle className="w-5 h-5 text-amber-500" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-500">
                              {t("dashboard.profile.page.emailStatus") || "Email Status"}
                            </p>
                            <p className="text-base font-medium text-amber-600">
                              {t("dashboard.profile.page.notVerified") || "Not Verified"}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full gap-4">
                {/* Subscription Information Card */}
                {subscriptionInfo && (
                  <div className="bg-white rounded-2xl w-full shadow-sm border border-gray-100 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <HiCreditCard className="w-5 h-5 text-primary" />
                      {t("dashboard.profile.page.subscription") || "Subscription"}
                    </h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                          <p className="text-sm text-gray-500">
                            {t("dashboard.profile.page.plan") || "Current Plan"}
                          </p>
                          <p className="text-base font-semibold text-gray-900">
                            {subscriptionInfo.planName || "No active plan"}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                          {subscriptionInfo.status || "Active"}
                        </span>
                      </div>

                      {subscriptionInfo.currentPeriodEnd && (
                        <div className="flex items-center gap-3 py-3">
                          <HiCalendar className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">
                              {t("dashboard.profile.page.renewsOn") || "Renews On"}
                            </p>
                            <p className="text-base font-medium text-gray-900">
                              {new Date(subscriptionInfo.currentPeriodEnd).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Account Info */}
                <div className="bg-white rounded-2xl w-full shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {t("dashboard.profile.page.accountInfo") || "Account Information"}
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">
                        {t("dashboard.profile.page.memberSince") || "Member Since"}
                      </span>
                      <span className="font-medium text-gray-900">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">
                        {t("dashboard.profile.page.userType") || "User Type"}
                      </span>
                      <span className="font-medium text-gray-900 capitalize">
                        {user.user_type || "User"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Credits Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {t("dashboard.profile.page.credits") || "Credits"}
                </h2>

                <div className="space-y-4">
                  {credits && credits.length > 0 ? (
                    credits.map((credit, index) => {
                      // Calculate percentage of remaining credits
                      const percentage = credit.total > 0
                        ? Math.round((credit.remaining / credit.total) * 100)
                        : 0;

                      return (
                        <div
                          key={index}
                          className="p-4 bg-gray-50 rounded-xl border border-gray-100"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              {credit.title}
                            </span>
                            <span
                              className="text-sm font-bold"
                              style={{ color: credit.color }}
                            >
                              {credit.remaining} / {credit.total}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: credit.color,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      {t("dashboard.profile.page.noCredits") || "No credits available"}
                    </p>
                  )}
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
