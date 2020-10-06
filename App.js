import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import Header from './src/components/Header'
import Card from './src/components/Card'

const topStoriesUrl = obj => `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&startAt="${obj.start}"&endAt="${obj.end}"&orderBy="$key"`;
const singleStoryUrl = id => `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;

const numToShow = 20;

const App = () => {

  const [stories, setStories] = useState([]);
  const [pagination, setPagination] = useState({ start: 1, end: numToShow });
  const [indicator, setIndicator] = useState(true)

  const flatlist = useRef();

  // handling fetching stories and refreshing
  useEffect(() => {
    getTopStories();
    const interval = setInterval(() => {
      getTopStories()
    }, 30000);
    return () => clearInterval(interval);
  }, [])

  // handling loading more content after pagination change
  useEffect(() => {
    console.log(stories.length)
    if (stories.length > 0) {
      if (pagination.end > stories.length) {
        getTopStories(true);
      }
    }

    const timeout = setTimeout(() => {
      flatlist.current.scrollToOffset({ animated: true, offset: 0 });
    }, 10)
    return () => clearTimeout(timeout)
  }, [pagination])

  // main function for fetching top stories
  async function getTopStories(fetchMore) {
    setIndicator(true)
    try {
      const res = await fetch(topStoriesUrl(pagination)).then(res => res.json());
      const fetchStories = Object.keys(res).map(id =>
        fetch(singleStoryUrl(res[id])).then(res => res.json())
      );
      const newStories = await Promise.all(fetchStories);
      setStories(stories)
      if (fetchMore) {
        setStories([...stories, ...newStories])
      } else {
        setPagination({ start: 1, end: numToShow });
        setStories(newStories);
      }
      setIndicator(false)
    } catch (e) {
      alert(e);
      setIndicator(false)
    }
  }

  // rendering cards with story informations
  function renderCards() {
    return (
      <FlatList
        ref={flatlist}
        style={{ width: '100%' }}
        data={stories.slice(pagination.start - 1, pagination.end)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(data) => (
          <>
            <View style={styles.cardOuterContainer}>
              <Card index={pagination.start + data.index} info={data.item} />
            </View>
            {renderPagination(data.index)}
          </>
        )}
      />
    )
  }

  // rendering pagination
  function renderPagination(i) {
    if (i == numToShow - 1) {
      return (
        <View style={styles.paginationContainer}>
          {pagination.start > 1 &&
            <>
              <TouchableOpacity style={styles.prevMoreButton} onPress={() => goToPage('prev')}>
                <Text style={styles.prevMoreText}>Prev</Text>
              </TouchableOpacity>
              <Text style={styles.dividerLine}>|</Text>
            </>
          }
          <TouchableOpacity style={styles.prevMoreButton} onPress={() => goToPage('next')}>
            <Text style={styles.prevMoreText}>More</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  // setting new pagination values
  function goToPage(where) {
    let updatePagination = new Object();
    updatePagination.start = where == 'prev' ? pagination.start - numToShow : pagination.start + numToShow;
    updatePagination.end = where == 'prev' ? pagination.end - numToShow : pagination.end + numToShow;
    setPagination(updatePagination)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header onRefresh={() => getTopStories()} />
        <View style={styles.renderCardsOuterContainer}>
          <View style={styles.renderCardsInnerContainer}>
            {renderCards()}
          </View>
        </View>
        {indicator &&
          <View style={styles.indicatorView}>
            <Text style={styles.loadingText}>Loading...</Text>
            <ActivityIndicator size='large' color='white' style={{ marginTop: 20 }} />
          </View>
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  renderCardsOuterContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: "#EAEAEA",
    alignItems: 'center'
  },
  renderCardsInnerContainer: {
    flex: 1,
    width: '95%',
    backgroundColor: 'white',
    alignItems: 'center'
  },
  cardOuterContainer: {
    width: '100%',
    alignItems: 'center'
  },
  paginationContainer: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center'
  },
  dividerLine: {
    color: '#ACACAC',
  },
  prevMoreButton: {
    padding: 15
  },
  prevMoreText: {
    fontSize: 16
  },
  indicatorView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1
  },
  loadingText: {
    fontSize: 20,
    color: 'white'
  }
});

export default App;
