import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { getAuth, signOut as signOutFirebase } from "firebase/auth";
import { doc, collection, updateDoc, query, where, getDocs } from "firebase/firestore";
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
    const [currentDoc, setCurrentDoc] = useState()
    const [points, setPoints] = useState(0);
    const { user } = useAuthentication();
    const scrollRef = useRef();

    useEffect(() => {
        const fetchUserPoints = async () => {
            try {
                if(user.email){
                    const q = query(collection(db, "user_points"), where("email", "==", user.email));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setCurrentDoc(doc.id)
                        setPoints(doc.data().total_points)
                    });
                }
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        fetchUserPoints()
    }, [user, navigation])

    useEffect(() => {
        const timer =
          counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

        if(counter === 0){
            storePoints()
        }

        return () => clearInterval(timer);
    }, [counter,]);


    async function storePoints() {
        try {
            if(currentDoc){
                await updateDoc(doc(db, "user_points", currentDoc), {
                    total_points: points + 5
                });
                setPoints(points + 5)
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    function handleOnScrollEnds() {
        setCounter(10)
    }

    async function signOut() {
        try {
          await signOutFirebase(auth);
        } catch (error) {
          setValue({
            ...value,
            error: error.message,
          })
        }
    }

    const renderItem = ({item}) => {
        return (
            <View style={[styles.item, {backgroundColor: item.color }]}>
                <Text style={styles.title}>{counter}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.customHeader}>
                <Text>You have earned <Text style={styles.pointsText}>{points}</Text></Text>
            </View>
            <FlatList
                ref={scrollRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
                showsVerticalScrollIndicator={false}
                pagingEnabled
                onMomentumScrollEnd={handleOnScrollEnds}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: utils.width,
    height: utils.height * 0.9,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customHeader: {
    height: utils.height * 0.1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  title: {
    fontSize: 75,
  },
  pointsText: {
    fontSize: 20
  }
});

export default WelcomeScreen;
