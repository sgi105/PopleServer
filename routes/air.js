var express = require("express");
var router = express.Router();
const axios = require("axios");
const serviceKey = require("../config/ServiceKey");

/* GET home page. */
router.get("/grade", async (req, res) => {
  const grade = await getAirGradeFromWeatherStation();
  console.log(grade);
  res.status(200).send({ grade });
});

async function getAirGradeFromWeatherStation() {
  const response = await axios.get(
    "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty",
    {
      params: {
        stationName: "마포구",
        dataTerm: "DAILY",
        pageNo: 1,
        numOfRows: 1,
        ServiceKey: serviceKey,
        ver: "1.0",
        _returnType: "json"
      }
    }
  );
  //   console.log(response.data.list[0]);
  const {
    coGrade,
    no2Grade,
    pm10Grade1h,
    pm25Grade1h,
    so2Grade
  } = response.data.list[0];
  //   console.log(coGrade, no2Grade, pm10Grade1h, pm25Grade1h, so2Grade);
  //   console.log(Math.max(coGrade, no2Grade, pm10Grade1h, pm25Grade1h, so2Grade));
  return Math.max(coGrade, no2Grade, pm10Grade1h, pm25Grade1h, so2Grade);
}

getAirGradeFromWeatherStation();
module.exports = router;
