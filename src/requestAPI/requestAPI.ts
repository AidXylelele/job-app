import axios from "axios";
import { JobType, LocationType } from "../redux/jobSlice";

export default async function getJobsRequest() {
  try {
    const { data } = await axios.get<JobType[]>(
      "https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu"
    );
    return data;
  } catch (error) {
    const res: JobType[] = [];
    return res;
  }
}

export async function getAddressRequest(location: LocationType) {
  try {
    const { data } = await axios.get<any>(
      `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAIzLyy4E4BOyVowNMi850bDZK3Bo2dgyE&result_type=country&latlng=${location.lat},${location.lng}&sensor=false`
    );
    return data.results[0].formatted_address;
  } catch (error) {
    const res: any[] = [];
    return res;
  }
}
