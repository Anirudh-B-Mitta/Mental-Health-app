import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Speedometer from './Speedometer'; // Make sure to adjust the path accordingly

const Home = () => {
  const navigation=useNavigation();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const handleButtonClick = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, isUser: true }]);
      setInputMessage('');
    }
  };
    
  const handleTextInput = (text) => {
    setInputMessage(text);
  };
  const [mood, setMood] = useState('Happy');
  const [stressLevel, setStressLevel] = useState(5);
  const [overallHealth, setOverallHealth] = useState(7); // Assuming a scale of 0-10
  const [mentalIllness, setMentalIllness] = useState(3); // Assuming a scale of 0-10
  const [everydayFunctioning, setEverydayFunctioning] = useState(8); // Assuming a scale of 0-10
  const [psychologicalDistress, setPsychologicalDistress] = useState(4); // Assuming a scale of 0-10
  const [suicidalThoughts, setSuicidalThoughts] = useState(1); // Assuming a scale of 0-10

  const handleMoodChange = (newMood) => {
    setMood(newMood);
  };

  const handleStressLevelChange = (value) => {
    setStressLevel(value);
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Mental Health Tracker</Text>
        </View>
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Mood:</Text>
          <Text style={styles.currentMood}>{mood}</Text>
          <View style={styles.moodButtons}>
            <TouchableOpacity
              style={[styles.moodButton, mood === 'Happy' && styles.selectedMood]}
              onPress={() => handleMoodChange('Happy')}
            >
              <Text>Happy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.moodButton,
                mood === 'Neutral' && styles.selectedMood,
              ]}
              onPress={() => handleMoodChange('Neutral')}
            >
              <Text>Neutral</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.moodButton, mood === 'Sad' && styles.selectedMood]}
              onPress={() => handleMoodChange('Sad')}
            >
              <Text>Sad</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stress Level:</Text>
          <Text style={styles.stressLevel}>{stressLevel}</Text>
          <View style={styles.stressSliderContainer}>
            <Text>Low</Text>
            <View style={styles.stressSlider}>
              <ProgressBar progress={stressLevel / 10} color="#4caf50" />
            </View>
            <Text>High</Text>
          </View>
          <TouchableOpacity
            style={styles.stressButton}
            onPress={() =>
              handleStressLevelChange(Math.floor(Math.random() * 10) + 1)
            }
          >
            <Text>Randomize Stress Level</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gaugesSection}>
          <Text style={styles.gaugeTitle}>Overall Health</Text>
          <Speedometer value={overallHealth} maxValue={10} label="Score" />
          <Text style={styles.gaugeTitle}>Mental Illness</Text>
          <Speedometer value={mentalIllness} maxValue={10} label="Score" />
          <Text style={styles.gaugeTitle}>Everyday Functioning</Text>
          <Speedometer value={everydayFunctioning} maxValue={10} label="Score" />
          <Text style={styles.gaugeTitle}>Psychological Distress</Text>
          <Speedometer value={psychologicalDistress} maxValue={10} label="Score" />
          <Text style={styles.gaugeTitle}>Suicidal Thoughts</Text>
          <Speedometer value={suicidalThoughts} maxValue={10} label="Score" />
        </View>
        {/* <View style ={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={()=> navigation.navigate('chat')}>
            <View
              style={{
                backgroundColor: 'green',
                padding: 5,
                marginRight: 10,
                marginLeft: 270,
                marginBottom: 10,
                marginTop:500,
                borderRadius: 9999,
                width: 60,
                height: 60,
                justifyContent: "center"
              }}>
                <MaterialIcons name="message" size={30} color="white" style={{ marginLeft: 10 }} />

            </View>
          </TouchableOpacity>
        </View>  
      </View> */}
      </ScrollView>
      <TouchableOpacity style={styles.floatingIcon} onPress={()=> navigation.navigate('chat')}>
        <MaterialIcons name="message" size={30} color="white" style={styles.floatingIconText} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: StatusBar.currentHeight || 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  currentMood: {
    fontSize: 20,
    marginBottom: 10,
  },
  moodButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedMood: {
    backgroundColor: '#add8e6',
  },
  stressLevel: {
    fontSize: 20,
    marginBottom: 10,
  },
  stressSliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stressSlider: {
    flex: 1,
    height: 20,
    marginHorizontal: 10,
  },
  stressButton: {
    padding: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
    alignItems: 'center',
  },
  gaugesSection: {
    marginBottom: 20,
  },
  gaugeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  gaugesSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  gaugeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  floatingIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4caf50',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  floatingIconText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Home;
