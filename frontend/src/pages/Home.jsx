import { Box, Button, Container, Flex, Input, Select } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import EventList from "../components/Home/EventList";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    q: "",
  });
  const [loading, setLoading] = useState(false);

  const handleFilter = (e) => {
    if (e.target.value == "") {
      let temp = { ...params };
      delete temp.state;
      return setParams(temp);
    }

    setParams({ ...params, state: e.target.value });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/events`, { params: params })
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [params]);

  return (
    <Box>
      <Box py={4}>
        <Container maxW="8xl">
          <Flex justifyContent="space-between">
            <Flex w="67%">
              <Input
                placeholder="Search by venue name"
                value={params.q}
                onChange={(e) => setParams({ ...params, q: e.target.value })}
              />
            </Flex>
            <Select placeholder="All States" w="30%" onChange={handleFilter}>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
            </Select>
          </Flex>
        </Container>
      </Box>
      <hr />
      <Container maxW="8xl" marginTop={10}>
        <EventList data={data} loading={loading} />
      </Container>
    </Box>
  );
};

export default Home;
