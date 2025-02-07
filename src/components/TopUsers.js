import React, { useEffect, useState } from 'react';
import DashboardDataService from '../services/dashboard.service';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await DashboardDataService.getTopUsers();

        console.log(response);
        setTopUsers(response.data);
      } catch (error) {
        console.error('Error fetching top users:', error);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-bold text-black dark:text-white">
        Top Users by Messages
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              User
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Messages
            </h5>
          </div>
        </div>

        {topUsers.map((user) => (
          <div
            key={user._id}
            className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="font-medium text-black dark:text-white">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="font-medium text-black dark:text-white">
                {user.messageCount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopUsers;
