/* --- Libraries --- */
#include <dht_nonblocking.h>
#include <ArduinoJson.h>

/* --- Variables --- */

/* DHT (t°/humidity) */
#define DHT_SENSOR_TYPE DHT_TYPE_11
static const int DHT_SENSOR_PIN = 2;
DHT_nonblocking dht_sensor( DHT_SENSOR_PIN, DHT_SENSOR_TYPE );

/* Photocell */
const int sensorPin = 0;
const int ledPin = 9;
int lightCal = 15;
int lightVal;

void setup() {
  Serial.begin(9600);
  while (!Serial) continue;

  StaticJsonDocument<200> doc;
  
  pinMode(ledPin, OUTPUT);
}

/*
  DHT function.
  Poll for a measurement, keeping the state machine alive.  Returns
  true if a measurement is available.
*/
static bool measure_environment( float *temperature, float *humidity ) {
  static unsigned long measurement_timestamp = millis( );

  /* Measure once every four seconds. */
  if( millis( ) - measurement_timestamp > 3000ul ) {
    if( dht_sensor.measure( temperature, humidity ) == true ) {
      measurement_timestamp = millis( );
      return( true );
    }
  }

  return( false );
}

void loop() {

  /* DHT */
  float temperature;
  float humidity;

  /* Measure temperature and humidity.  If the functions returns
     true, then a measurement is available. */
  if( measure_environment( &temperature, &humidity ) == true ) {
    Serial.print( "T = " );
    Serial.print( temperature, 1 );
    Serial.print( " deg. C, H = " );
    Serial.print( humidity, 1 );
    Serial.println( "%" );
  }
  /* --------- */

  /* Photocell */
  lightVal = analogRead(sensorPin);
  Serial.println(lightVal);
  
  if (lightVal < lightCal) {
    digitalWrite(ledPin, HIGH);
  }
  else {
    digitalWrite (ledPin, LOW);
  }
  /* --------- */

  /* JSON */
  if( measure_environment( &temperature, &humidity ) == true ) {
    
  }
}
