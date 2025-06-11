import React from 'react';
import Card from '../components/Card';
import { dashboardSummaryStats, topEventsData, bookingsOverTimeData, dailyBookingsThisWeek } from '../data/dashboardData';
import styles from './DashboardPage.module.css';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardPage: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.dashboardTitle}>Dashboard Overview</h2>

      {/* Summary Cards Section */}
      <div className={styles.summaryCards}>
        <Card title="Bookings Today" value={dashboardSummaryStats.totalBookingsToday.toLocaleString()} />
        <Card title="Bookings This Week" value={dashboardSummaryStats.totalBookingsThisWeek.toLocaleString()} />
        <Card title="Bookings This Month" value={dashboardSummaryStats.totalBookingsThisMonth.toLocaleString()} />
        <Card title="Total Revenue" value={`$${dashboardSummaryStats.totalRevenue.toLocaleString()}`} />
        <Card title="Total Refunds" value={`$${dashboardSummaryStats.totalRefunds.toLocaleString()}`} />
      </div>

      {/* Main Content Sections: Top Events and Bookings Chart */}
      <div className={styles.mainContentAreas}>
        {/* Top Events Section */}
        <div className={styles.topEventsSection}>
          <Card title="Top Events by Booking">
            <ul className={styles.topEventsList}>
              {topEventsData.map(event => (
                <li key={event.id} className={styles.topEventsItem}>
                  <span>{event.eventName}</span>
                  <span className={styles.bookingCount}>{event.bookingCount.toLocaleString()} bookings</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Bookings Over Time Chart Section */}
        <div className={styles.bookingsChartSection}>
          <Card title="Bookings Over Time (Monthly)">
            <div className={styles.chartContainer}> {/* Use this class for sizing */}
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={bookingsOverTimeData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '14px' }} />
                  <Area type="monotone" dataKey="bookings" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} name="Monthly Bookings"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* Daily Bookings Chart Section */}
      <div className={styles.dailyBookingsChartSection}>
        <Card title="Daily Bookings (This Week)">
          <div className={styles.chartContainer}> {/* Use this class for sizing */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyBookingsThisWeek} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '14px' }} />
                <Bar dataKey="bookings" fill="#82ca9d" name="Daily Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

    </div>
  );
};

export default DashboardPage;
