import { Card, Text, Button, Avatar, Chip, Surface } from "react-native-paper";
import {
  StyleSheet,
  View,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getDateFormat } from "../commands/getDateFormat";
import { addDays } from "../commands/addDays";
import { after7pm } from "../constants/after7pm";
import { cleanFetchSlots } from "../commands/fetchSlots";
import Spinner from "react-native-loading-spinner-overlay";
import { convertStringToArray } from "../commands/converStringToArray";

export const Testscreen = () => {
  const [fetchedString, setFetchedString] = useState({ renderText: "" });
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  let fetchedStringToArray = convertStringToArray(fetchedString.renderText);

  const formattedToday = getDateFormat(date);
  console.log(fetchedStringToArray);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <ScrollView>
            {fetchedStringToArray.length > 0 ? (
              fetchedStringToArray.map((ele) =>
                ele.endsWith("cc") ? (
                  <Text
                    variant="titleSmall"
                    key={ele}
                    style={{ fontWeight: "bold", color: "#e33f36" }}
                    onPress={() =>
                      Linking.openURL(
                        "https://www.onepa.gov.sg/facilities/availability?facilityId=" +
                          ele +
                          "_BADMINTONCOURTS&date=" +
                          formattedToday +
                          "&time=all"
                      )
                    }
                  >
                    {ele}
                  </Text>
                ) : (
                  <Text variant="bodySmall">{ele}</Text>
                )
              )
            ) : (
              <Text variant="bodySmall">{"No slots avail :("}</Text>
            )}
          </ScrollView>
        </Card.Content>
      </Card>
      <View style={styles.btnContainer}>
        <Surface style={styles.surface} elevation={4}>
          <Text variant="bodySmall" style={styles.description}>
            Only fetches from courts in the west!!
          </Text>
          <Text variant="titleSmall" style={styles.title}>
            To Use
          </Text>
          <Text variant="bodySmall" style={styles.description}>
            Select a date and Tap the cat
          </Text>
          <Text variant="titleSmall" style={styles.title}>
            It's me
          </Text>
          <Text variant="bodySmall">@polulume</Text>
        </Surface>
        <Chip
          onPress={showDatepicker}
          style={{ height: 40, marginBottom: 10 }}
          mode="outlined"
          compact={true}
          textStyle={{ fontSize: 10 }}
        >
          {getDateFormat(date)}
        </Chip>
        <TouchableOpacity style={styles.dateBtn} onPress={showDatepicker}>
          <Avatar.Icon size={46} icon="calendar" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            setIsLoading(true);
            setFetchedString({
              renderText: await cleanFetchSlots(formattedToday),
            });
            setIsLoading(false);
          }}
        >
          <Avatar.Image
            size={86}
            source={require("../images/tiger.jpg")}
            onPress={async () => {
              setIsLoading(true);
              setFetchedString({
                renderText: await cleanFetchSlots(formattedToday),
              });
              setIsLoading(false);
            }}
          />
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={false}
            onChange={onChange}
            maximumDate={addDays(new Date(), 15)}
            minimumDate={new Date()}
          />
        )}
      </View>
      <Spinner
        visible={isLoading}
        textContent={"Fetching courts..."}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
    height: "100%",
  },
  btnContainer: {
    width: "30%",
    height: "90%",
    margin: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  card: {
    width: "65%",
    marginBottom: 20,
    height: "95%",
  },
  dateBtn: {
    marginBottom: 40,
  },
  surface: {
    marginBottom: 40,
    padding: 8,
    height: "66%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    margin: 5,
  },
  description: {
    marginBottom: 15,
  },
});

//@react-native-community/datetimepicker - expected version: 6.5.2
//Your project may not work correctly until you install the correct versions of the packages.
//[RUN_EXPO_DOCTOR] To install the correct versions of these packages, please run: expo doctor --fix-dependencies,
//[RUN_EXPO_DOCTOR] or install individual packages by running expo install [package-name ...]
