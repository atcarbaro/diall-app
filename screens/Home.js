import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { getAuth, signOut as signOutFirebase } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { data } from '../utils/data'
import utils from '../utils/constants';
import { Text } from 'react-native-elements';
import { db } from '../config/firebaseConfig';
import { useAuthentication } from '../utils/hooks/useAuthentication';

const auth = getAuth();

const WelcomeScreen = ({ navigation }) => {
    const [value, setValue] = useState({
        error: ''
    })
    const [selectedId, setSelectedId] = useState();
    const [counter, setCounter] = useState(10)
    const [points, setPoints] = useState(0)
    const { user } = useAuthentication();

    const scrollRef = useRef();

    useEffect(() => {

        const fetchUserPoints = async () => {
            try {
                if(user.email){
                    const userPointsRef = collection(db, "user_points");
                    const q = query(userPointsRef, where("email", "==", user.email));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        console.log('doc', doc.data())
                        // doc.data() is never undefined for query doc snapshots
                        setPoints(doc.data().total_points)
                    });
                }
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }

        // call the function
        fetchUserPoints()

    }, [user])

    async function signOut() {
        try {
          await signOutFirebase(auth);
        } catch (error) {
        console.log('hey', error)
          setValue({
            ...value,
            error: error.message,
          })
        }
    }

    useEffect(() => {
        const timer =
          counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

          if(counter === 0){

        }
        return () => clearInterval(timer);


    }, [counter]);

    const renderItem = ({item}) => {
        return (
            <View style={[styles.item, {backgroundColor: item.color }]}>
                <Text style={styles.title}>{counter}</Text>
            </View>
        );
    };

    console.log('points', points)

    return (
        <View style={styles.container}>
            <FlatList
                ref={scrollRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
                showsVerticalScrollIndicator={false}
                pagingEnabled
            />
        {/* <Text>Home screen!</Text> */}
        {/* <View style={styles.buttons}>
            <Button title="Sign out" buttonStyle={styles.control} onPress={signOut} />
        </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: utils.width,
    height: utils.height,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 75,
  },

});

export default WelcomeScreen;
