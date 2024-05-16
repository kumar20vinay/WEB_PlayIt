import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Input,
  Select,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    cover: "",
    limit: "",
    venue: "",
    city: "",
    state: "",
    startAt: "",
    endAt: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const toast = useToast();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = () => {
    if (!user)
      return toast({
        title: "Please login first.",
        position: "top",
        status: "error",
        isClosable: true,
      });

    const {
      title,
      description,
      cover,
      limit,
      venue,
      city,
      state,
      startAt,
      endAt,
      date,
    } = form;

    if (
      !title ||
      !description ||
      !cover ||
      !limit ||
      !city ||
      !venue ||
      !state ||
      !startAt ||
      !endAt ||
      !date
    )
      return toast({
        title: "All fields are required.",
        position: "top",
        status: "error",
        isClosable: true,
      });

    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/events/create`, form, {
        headers: {
          Authorization: user?.token,
        },
      })
      .then(() => {
        setLoading(false);
        toast({
          title: "Event created successfully.",
          position: "top",
          status: "success",
          isClosable: true,
        });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: err.response.data.msg,
          position: "top",
          status: "error",
          isClosable: true,
        });
      });
  };


  return (
    <Center marginTop={10}>
      <Card w="lg">
        <CardBody>
          <Text fontSize="2xl" fontWeight="500">
            Create a Event
          </Text>
          <hr />
          <VStack marginTop={5} spacing={3}>
            <Input
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <Input
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
            <Input
              placeholder="Cover"
              name="cover"
              value={form.cover}
              onChange={handleChange}
            />
            <Input
              placeholder="Max Participants"
              type="number"
              name="limit"
              value={form.limit}
              onChange={handleChange}
            />
              <Input
                placeholder="Venue"
                name="venue"
                value={form.venue}
                onChange={handleChange}
              />
            <Input
                placeholder="City"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            <Select
              placeholder="Select State"
              name="state"
              value={form.state}
              onChange={handleChange}
            >
              <option value="Andhra Pradesh">Andhra Pradesh</option>
  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
  <option value="Assam">Assam</option>
  <option value="Bihar">Bihar</option>
  <option value="Chhattisgarh">Chhattisgarh</option>
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
  <option value="Delhi">Delhi</option>
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

            <Flex justifyContent="space-between" w="100%" flexWrap="wrap">
              <Box>
                <Text>Date</Text>
                <Input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <Text>Start Time</Text>
                <Input
                  type="time"
                  name="startAt"
                  value={form.startAt}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <Text>End Time</Text>
                <Input
                  type="time"
                  name="endAt"
                  value={form.endAt}
                  onChange={handleChange}
                />
              </Box>
            </Flex>
            <Button
              w="100%"
              colorScheme="green"
              isLoading={loading}
              loadingText="CREATE EVENT"
              onClick={handleCreateEvent}
            >
              CREATE EVENT
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Center>
  );
};

export default CreateEvent;
