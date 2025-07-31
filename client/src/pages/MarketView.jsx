

import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import axios from "axios";
import { BASE_URL } from "../BASE_URL.JSX";

const MarketView = () => {
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL+"/marketdata").then((res) => {
      setMarketData(res.data);
    });
  }, []);



  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
    
      <StatCard
        title="Top Communities"
        fullData={marketData}
        displayField="community"
      />
      <StatCard
        title="Homesite Prices"
        fullData={marketData}
        displayField="homesitePrice"
      />
      <StatCard
        title="Square Footage"
        fullData={marketData}
        displayField="homesiteSqft"
      />
      <StatCard
        title="Zipcodes"
        fullData={marketData}
        displayField="zipcode"
      />

    </div>
  );
};

export default MarketView;
