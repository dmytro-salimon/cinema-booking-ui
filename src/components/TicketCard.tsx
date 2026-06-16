import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

interface TicketCardProps {
  item: any;
}
const TICKET_WIDTH = 296;
const BARCODE_PATTERN = [2, 1, 3, 1, 1, 4, 1, 2, 2, 1, 3, 1, 1, 2, 4, 1, 1, 2, 3, 1, 2, 1, 4, 1, 2, 1];

const TicketCard: React.FC<TicketCardProps> = ({ item }) => {

  const { colors, theme } = useContext(ThemeContext);
  
  const isLight = theme === 'light';

  const topBgColor = isLight ? '#D4D6DD' : '#E8E9F1';
  const bottomBgColor = isLight ? '#E8E9F1' : '#FFFFFF';
  const contentColor = isLight ? '#1F2024' : '#010101';

  return (
    <View style={styles.ticketWrapper}>
      
      <View style={[styles.ticketTop, { backgroundColor: topBgColor }]}>
        <Image 
          source={item.imageUrl || { uri: 'https://via.placeholder.com/600x800' }} 
          style={styles.poster} 
          resizeMode="cover"
        />
      </View>

      <View style={[styles.separatorContainer, { backgroundColor: bottomBgColor }]}>
        <View style={[styles.cutout, styles.cutoutLeft, { backgroundColor: colors.background }]} />
        
        <View style={styles.dashedLineContainer}>
          {[...Array(30)].map((_, index) => (
            <View key={index} style={[styles.dash, { backgroundColor: colors.background }]} />
          ))}
        </View>

        <View style={[styles.cutout, styles.cutoutRight, { backgroundColor: colors.background }]} />
      </View>

      <View style={[styles.ticketBottom, { backgroundColor: bottomBgColor }]}>
        <Text style={[styles.movieTitle, { color: contentColor }]} numberOfLines={1}>
          {item.title}
        </Text>
        
        <Text style={styles.dateTime}>
          {item.date}, {item.time}
        </Text>

        <View style={styles.rowSeatContainer}>
          <Text style={[styles.rowSeatText, { color: contentColor }]}>
            <Text style={[styles.boldLabel, { color: contentColor }]}>Ряд: </Text>{item.row || 2}
          </Text>
          <Text style={[styles.rowSeatText, { color: contentColor }]}>
            <Text style={[styles.boldLabel, { color: contentColor }]}>Місце: </Text>{item.seat || 14}
          </Text>
        </View>

        <View style={styles.barcodeContainer}>
          {BARCODE_PATTERN.map((widthValue, index) => (
            <View 
              key={index} 
              style={[
                styles.barcodeBar,
                { width: widthValue * 1.5, backgroundColor: contentColor }
              ]} 
            />
          ))}
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  ticketWrapper: {
    width: TICKET_WIDTH,
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },

  ticketTop: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 16,
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  
  // --- ЛІНІЯ ВІДРІЗУ ---
  separatorContainer: {
    height: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  cutout: {
    width: 32,
    height: 32,
    borderRadius: 20,
    position: 'absolute',
    top: -16,
    zIndex: 2,
  },
  cutoutLeft: {
    left: -16,
  },
  cutoutRight: {
    right: -16,
  },
  
  // --- СТИЛІ ПУНКТИРУ ---
  dashedLineContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  dash: {
    width: 5,
    height: 2,
    marginRight: 5,
  },

  // --- НИЖНІЙ БЛОК ---
  ticketBottom: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 2,
    textAlign: 'center',
  },
  dateTime: {
    color: '#71727A',
    fontSize: 12,
    marginBottom: 8,
  },
  rowSeatContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  rowSeatText: {
    width: '50%',
    textAlign: 'center',
    fontSize: 14,
  },
  boldLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  barcodeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 64,
  },
  barcodeBar: {
    height: '100%',
    marginHorizontal: 1,
    borderRadius: 2,
  },
});

export default TicketCard;