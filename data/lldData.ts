// ── Pre-processed LLD codebase: actual code from Himanshu's implementations ──
// Sourced from D:\Study\Low Level Design

export interface LLDFile {
  name: string;
  role: string;
  language: 'java';
  content: string;
}

export interface FlowStep {
  label: string;
  detail: string;
  classes: string[];
}

export interface KeyClass {
  name: string;
  role: string;
  pattern?: string;
  file: string;
}

export interface LLDProblem {
  id: string;
  name: string;
  tagline: string;
  difficulty: 'Medium' | 'Hard';
  patterns: string[];
  keyClasses: KeyClass[];
  flowSteps: FlowStep[];
  files: LLDFile[];
  interviewQuestions: string[];
}

export const lldProblems: LLDProblem[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. MUSIC PLAYER (SpotifyLLD)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'spotify',
    name: 'Music Player (Spotify LLD)',
    tagline: 'Façade + Strategy + Factory + Adapter',
    difficulty: 'Hard',
    patterns: ['Singleton', 'Façade', 'Strategy', 'Factory', 'Adapter'],
    keyClasses: [
      { name: 'MusicPlayerFacade', role: 'Unified entry-point (Singleton)', pattern: 'Facade + Singleton', file: 'MusicPlayerFacade.java' },
      { name: 'AudioEngine',       role: 'Handles play/pause state',        pattern: 'Core Engine',         file: 'AudioEngine.java' },
      { name: 'IPlayStrategy',     role: 'Play order interface (Sequential / Random)', pattern: 'Strategy', file: 'IPlayStrategy.java' },
      { name: 'AudioOutputDeviceFactory', role: 'Creates correct output adapter', pattern: 'Factory', file: 'AudioOutputDeviceFactory.java' },
      { name: 'BluetoothSpeakerAdapter',  role: 'Adapts 3rd-party BT API', pattern: 'Adapter', file: 'BluetoothSpeakerAdapter.java' },
    ],
    flowSteps: [
      { label: 'Client calls Facade',   detail: 'MusicPlayerFacade.getInstance(): single entry-point', classes: ['MusicPlayerFacade'] },
      { label: 'Connect output device', detail: 'OutputDeviceManager + AudioOutputDeviceFactory creates the right Adapter', classes: ['OutputDeviceManager', 'AudioOutputDeviceFactory'] },
      { label: 'Select play strategy',  detail: 'StrategyManager returns Sequential or Random IPlayStrategy', classes: ['StrategyManager', 'IPlayStrategy'] },
      { label: 'Load playlist',         detail: 'PlaylistManager.getPlaylist() → strategy.setPlayList()', classes: ['PlaylistManager'] },
      { label: 'Play songs',            detail: 'Strategy.next() → AudioEngine.play(device, song)', classes: ['AudioEngine', 'IAudioOutputDevice'] },
    ],
    interviewQuestions: [
      'Why use a Façade pattern here instead of exposing managers directly?',
      'How would you add a new output device (e.g., AirPlay) without touching existing code?',
      'Explain how Strategy pattern enables shuffle without if-else chains.',
      'How does the Adapter here follow the Open/Closed principle?',
      'How would you support cross-fade between songs?',
    ],
    files: [
      {
        name: 'MusicPlayerFacade.java',
        role: 'Singleton façade: single entry-point for all operations',
        language: 'java',
        content: `package app;

import Core.AudioEngine;
import Strategies.IPlayStrategy;
import device.IAudioOutputDevice;
import enums.OutputDeviceType;
import enums.PlayStrategyType;
import managers.OutputDeviceManager;
import managers.PlaylistManager;
import managers.StrategyManager;
import models.Song;
import models.Playlist;

public class MusicPlayerFacade {
    private static MusicPlayerFacade instance = null;
    private AudioEngine audioEngine;
    private IPlayStrategy currentPlayStrategy;
    private IAudioOutputDevice currentOutputDevice;
    private StrategyManager strategyManager;
    private Playlist currentPlaylist;

    private MusicPlayerFacade() {
        audioEngine = new AudioEngine();
    }

    public static MusicPlayerFacade getInstance() {
        if (instance == null) {
            instance = new MusicPlayerFacade();
        }
        return instance;
    }

    public void connectDevice(OutputDeviceType deviceType) {
        OutputDeviceManager.getInstance().connect(deviceType);
        currentOutputDevice = OutputDeviceManager.getInstance().getCurrentOutputDevice();
    }

    public void setStrategy(PlayStrategyType strategyType) {
        strategyManager = StrategyManager.getInstance();
        currentPlayStrategy = strategyManager.getStrategy(strategyType);
    }

    public void loadPlayList(String playlistName) {
        currentPlaylist = PlaylistManager.getInstance().getPlaylist(playlistName);
        if (currentPlaylist == null) {
            System.out.println("Playlist not found: " + playlistName);
        }
        currentPlayStrategy.setPlayList(currentPlaylist);
    }

    public void playPlaylist() {
        if (currentPlaylist == null) {
            System.out.println("No playlist loaded.");
            return;
        }
        while (currentPlayStrategy.hasNext()) {
            Song songToPlay = currentPlayStrategy.next();
            playSong(songToPlay);
        }
    }

    public void playSong(Song song) {
        if (currentOutputDevice == null) {
            System.out.println("No output device connected.");
            return;
        }
        audioEngine.play(currentOutputDevice, song);
    }

    public void pauseSong(Song song) {
        if (audioEngine.getCurrentSongTitle().equals(song.getName())) {
            audioEngine.pause();
        } else {
            System.out.println("The song is not currently playing.");
        }
    }
}`,
      },
      {
        name: 'AudioEngine.java',
        role: 'Core engine: manages play/pause state for a single song',
        language: 'java',
        content: `package Core;

import device.IAudioOutputDevice;
import models.Song;

public class AudioEngine {
    private Song currentSong;
    private boolean songIsPaused;

    public AudioEngine() {
        this.currentSong = null;
        this.songIsPaused = false;
    }

    public void play(IAudioOutputDevice outputDevice, Song song) {
        if (song == null) {
            System.out.println("No song selected to play.");
            return;
        }
        // Resume if paused on the same song
        if (songIsPaused && song == currentSong) {
            songIsPaused = false;
            System.out.println("Resuming: " + song.getName());
            outputDevice.playAudio(song);
            return;
        }
        // New song
        currentSong = song;
        songIsPaused = false;
        outputDevice.playAudio(song);
    }

    public void pause() {
        if (currentSong != null && !songIsPaused) {
            songIsPaused = true;
            System.out.println("Pausing: " + currentSong.getName());
        }
    }

    public String getCurrentSongTitle() {
        return currentSong != null ? currentSong.getName() : "No song playing.";
    }
}`,
      },
      {
        name: 'IPlayStrategy.java',
        role: 'Strategy interface: decouples play-order from AudioEngine',
        language: 'java',
        content: `package Strategies;

import models.Playlist;
import models.Song;

// Strategy Pattern: defines the algorithm for ordering songs.
// Concrete implementations: SequentialPlayStrategy, RandomPlayStrategy
public interface IPlayStrategy {
    void setPlayList(Playlist playList);
    boolean hasNext();
    Song next();
    boolean hasPrevious();
    Song previous();
    default void addToNext() {}
}`,
      },
      {
        name: 'AudioOutputDeviceFactory.java',
        role: 'Factory: creates the correct Adapter for each device type',
        language: 'java',
        content: `package factories;

import device.IAudioOutputDevice;
import enums.OutputDeviceType;

// Factory Pattern: centralises object creation, hides adapter details from caller
public class AudioOutputDeviceFactory {
    public static IAudioOutputDevice createAudioOutputDevice(OutputDeviceType deviceType) {
        switch (deviceType) {
            case SPEAKER:
                return new device.WiredSpeakerAdapter(new external.WiredSpeakerAPI());
            case BLUETOOTH:
                return new device.BluetoothSpeakerAdapter(new external.BluetoothSpeakerAPI());
            case HEADPHONES:
                return new device.HeadphoneAdapter(new external.HeadPhoneAPI());
            default:
                throw new IllegalArgumentException("Unknown device type: " + deviceType);
        }
    }
}`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. IN-MEMORY KEY-VALUE STORE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'kvstore',
    name: 'In-Memory KV Store',
    tagline: 'Strategy (eviction) + TTL daemon thread + LRU doubly-linked list',
    difficulty: 'Hard',
    patterns: ['Strategy', 'Template Method', 'Daemon Thread'],
    keyClasses: [
      { name: 'KVStore',           role: 'Orchestrator: get/set/delete with eviction', pattern: 'Facade',   file: 'KVStore.java' },
      { name: 'EvictionPolicy',    role: 'Strategy interface for eviction',             pattern: 'Strategy', file: 'EvictionPolicy.java' },
      { name: 'LRUEvictionPolicy', role: 'Doubly-linked list + HashMap for O(1) LRU',  pattern: 'Strategy', file: 'LRUEvictionPolicy.java' },
      { name: 'TTLManager',        role: 'PriorityQueue + daemon thread for TTL expiry', pattern: 'Active Object', file: 'TTLManager.java' },
      { name: 'CacheEntry',        role: 'Wraps value + expiry metadata',              file: 'CacheEntry.java' },
    ],
    flowSteps: [
      { label: 'kvstore.set(key, value, ttlMs)', detail: 'Evict if at capacity, create CacheEntry, store, notify TTLManager', classes: ['KVStore', 'EvictionPolicy'] },
      { label: 'Eviction triggered',             detail: 'policy.evict() removes LRU tail node via doubly-linked list', classes: ['LRUEvictionPolicy'] },
      { label: 'TTLManager tracking',            detail: 'PriorityQueue ordered by expiry; daemon thread wakes every 500ms', classes: ['TTLManager'] },
      { label: 'TTL expiry',                     detail: 'On expiry → store.delete(key) → policy.onDelete(key)', classes: ['TTLManager', 'KVStore'] },
      { label: 'kvstore.get(key)',               detail: 'Check expiry → policy.onGet(key) → moveToFront in LRU', classes: ['KVStore', 'LRUEvictionPolicy'] },
    ],
    interviewQuestions: [
      'Why use a doubly-linked list for LRU instead of just a LinkedHashMap?',
      'How does the daemon thread prevent memory leaks on TTL expiry?',
      'How would you make KVStore thread-safe for concurrent writes?',
      'What is the time complexity of get() and set()?',
      'How would you add an LFU eviction policy without modifying KVStore?',
    ],
    files: [
      {
        name: 'KVStore.java',
        role: 'Main store: delegates eviction and TTL to strategy/manager',
        language: 'java',
        content: `import java.util.HashMap;
import java.util.Map;

public class KVStore {
    private final Map<String, CacheEntry> store;
    private final EvictionPolicy policy;
    private final TTLManager manager;
    private final int capacity;

    public KVStore(EvictionPolicy policy, int capacity) {
        this.store = new HashMap<>();
        this.policy = policy;
        this.manager = new TTLManager(this);
        this.capacity = capacity;
        // Daemon thread: auto-expires when JVM exits
        Thread t1 = new Thread(manager);
        t1.setDaemon(true);
        t1.start();
    }

    public Object get(String key) {
        if (!store.containsKey(key)) return null;
        if (store.get(key).isExpired()) {
            policy.onDelete(key);
            store.remove(key);
            return null;
        }
        policy.onGet(key);
        return store.get(key).getValue();
    }

    public void set(String key, Object value) {
        if (store.size() >= capacity) {
            String victim = policy.evict();
            store.remove(victim);
        }
        CacheEntry entry = new CacheEntry(value);
        store.put(key, entry);
        policy.onPut(key, entry);
    }

    // Overload with TTL support
    public void set(String key, Object value, long ttlMs) {
        if (store.size() >= capacity) {
            String victim = policy.evict();
            store.remove(victim);
        }
        CacheEntry entry = new CacheEntry(value, ttlMs);
        store.put(key, entry);
        policy.onPut(key, entry);
        manager.track(key, entry.getExpiryTimeMillis());
    }

    public void delete(String key) {
        store.remove(key);
        policy.onDelete(key);
    }
}`,
      },
      {
        name: 'LRUEvictionPolicy.java',
        role: 'O(1) LRU via doubly-linked list + HashMap',
        language: 'java',
        content: `import java.util.HashMap;
import java.util.Map;

public class LRUEvictionPolicy implements EvictionPolicy {
    private class Node {
        String key;
        Node next, prev;
        public Node(String k) { this.key = k; }
    }

    private Map<String, Node> map;
    Node head, tail;

    public LRUEvictionPolicy() {
        this.map = new HashMap<>();
        // Sentinel nodes eliminate null checks
        head = new Node("HEAD");
        tail = new Node("TAIL");
        head.next = tail;
        tail.prev = head;
    }

    @Override
    public void onGet(String key) {
        if (map.containsKey(key)) moveToFront(map.get(key));
    }

    @Override
    public void onPut(String key, CacheEntry entry) {
        Node node = new Node(key);
        map.put(key, node);
        addNode(node);
    }

    @Override
    public String evict() {
        if (tail.prev == head) return null;
        Node lru = tail.prev;   // LRU is at the tail
        removeNode(lru);
        map.remove(lru.key);
        return lru.key;
    }

    @Override
    public void onDelete(String key) {
        if (!map.containsKey(key)) return;
        Node node = map.get(key);
        removeNode(node);
        map.remove(key);
    }

    private void moveToFront(Node node) { removeNode(node); addNode(node); }

    private void addNode(Node node) {
        Node next = head.next;
        node.prev = head; node.next = next;
        next.prev = node; head.next = node;
    }

    private void removeNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}`,
      },
      {
        name: 'TTLManager.java',
        role: 'Daemon thread: PriorityQueue-based TTL expiry monitor',
        language: 'java',
        content: `import java.util.Comparator;
import java.util.PriorityQueue;

public class TTLManager implements Runnable {
    private class TTLEntry {
        String key;
        long expiryTimeMillis;
        public TTLEntry(String key, long time) {
            this.key = key;
            this.expiryTimeMillis = time;
        }
    }

    private KVStore store;
    private PriorityQueue<TTLEntry> pq;

    public TTLManager(KVStore store) {
        this.store = store;
        // Min-heap by expiry time: O(log n) insert, O(1) peek
        this.pq = new PriorityQueue<>(Comparator.comparingLong(e -> e.expiryTimeMillis));
    }

    public void track(String key, long expiryTime) {
        pq.add(new TTLEntry(key, expiryTime));
    }

    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            // Drain all expired entries in O(k log n) where k = expired count
            while (!pq.isEmpty() && System.currentTimeMillis() >= pq.peek().expiryTimeMillis) {
                TTLEntry entry = pq.poll();
                store.delete(entry.key);
            }
            try {
                Thread.sleep(500);   // Poll every 500ms
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }
    }
}`,
      },
      {
        name: 'EvictionPolicy.java',
        role: 'Strategy interface: swap eviction algorithm without changing KVStore',
        language: 'java',
        content: `// Strategy Pattern: EvictionPolicy is the interface;
// LRUEvictionPolicy, LFUEvictionPolicy are concrete strategies.
// KVStore depends only on this interface: Open/Closed principle.
public interface EvictionPolicy {
    void onGet(String key);
    void onPut(String key, CacheEntry entry);
    void onDelete(String key);
    String evict();
}`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. PARKING LOT
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'parking',
    name: 'Parking Lot System',
    tagline: 'Multi-level with vehicle-to-spot matching and ticket system',
    difficulty: 'Medium',
    patterns: ['Factory', 'Strategy', 'Composite'],
    keyClasses: [
      { name: 'ParkingLot',  role: 'Orchestrates levels, issues tickets', pattern: 'Facade', file: 'ParkingLot.java' },
      { name: 'Level',       role: 'Contains spots, finds available spot by type', file: 'Level.java' },
      { name: 'ParkingSpot', role: 'Holds vehicle, tracks availability', file: 'ParkingSpot.java' },
      { name: 'Vehicle',     role: 'Abstract base: Car / Bike / Truck extend it', pattern: 'Polymorphism', file: 'Vehicle.java' },
      { name: 'Ticket',      role: 'Records entry time, spot, and vehicle', file: 'Ticket.java' },
    ],
    flowSteps: [
      { label: 'parkVehicle(vehicle)',   detail: 'Iterate levels → Level.findAvailableSpot(vehicleType)', classes: ['ParkingLot', 'Level'] },
      { label: 'Spot matching',          detail: 'Level checks SpotType vs VehicleType: no spot = RuntimeException', classes: ['Level', 'ParkingSpot'] },
      { label: 'Assign vehicle',         detail: 'spot.assignVehicle(vehicle) marks spot occupied', classes: ['ParkingSpot'] },
      { label: 'Issue ticket',           detail: 'new Ticket(vehicle, spot): records entry timestamp', classes: ['Ticket'] },
      { label: 'unparkVehicle(ticket)',  detail: 'Retrieve spot from ticket → removeVehicle() → setExitTime()', classes: ['ParkingLot', 'ParkingSpot', 'Ticket'] },
    ],
    interviewQuestions: [
      'How would you handle concurrent parked vehicles without race conditions?',
      'How would you add dynamic pricing based on vehicle size and duration?',
      'How does this design support adding new vehicle types (e.g., EVs)?',
      'What pattern would you use to calculate parking fees for different spot types?',
      'How would you scale this for a multi-building parking complex?',
    ],
    files: [
      {
        name: 'ParkingLot.java',
        role: 'Top-level orchestrator: iterates levels to park/unpark',
        language: 'java',
        content: `import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ParkingLot {
    private List<Level> levelList = new ArrayList<>();

    public ParkingLot(List<Level> list) {
        this.levelList = list;
    }

    public Ticket parkVehicle(Vehicle vehicle) {
        for (Level level : levelList) {
            ParkingSpot spot = level.findAvailableSpot(vehicle);
            if (spot != null) {
                spot.assignVehicle(vehicle);
                return new Ticket(vehicle, spot);
            }
        }
        throw new RuntimeException("No available spot for vehicle type: " + vehicle.getType());
    }

    public void unparkVehicle(Ticket ticket) {
        ParkingSpot spot = ticket.getSpot();
        spot.removeVehicle();
        ticket.setExitTime(LocalDateTime.now());
    }

    public void displayAvailableSpots() {
        for (int i = 0; i < levelList.size(); i++) {
            System.out.println("Level " + i);
            for (VehicleType type : VehicleType.values()) {
                int available = levelList.get(i).getAvailableParkingSpotCount(type);
                System.out.println("  " + type + ": " + available + " spots");
            }
        }
    }
}`,
      },
      {
        name: 'Level.java',
        role: 'Contains a floor of spots: finds first matching spot by vehicle type',
        language: 'java',
        content: `import java.util.ArrayList;
import java.util.List;

public class Level {
    private List<ParkingSpot> spots = new ArrayList<>();
    private int levelNumber;

    public Level(int levelNumber, List<ParkingSpot> spots) {
        this.levelNumber = levelNumber;
        this.spots = spots;
    }

    public ParkingSpot findAvailableSpot(Vehicle vehicle) {
        for (ParkingSpot spot : spots) {
            if (spot.isAvailable() && spot.canFitVehicle(vehicle)) {
                return spot;
            }
        }
        return null;  // No spot available on this level
    }

    public int getAvailableParkingSpotCount(VehicleType type) {
        return (int) spots.stream()
            .filter(s -> s.isAvailable() && s.getSpotType().fitsVehicle(type))
            .count();
    }
}`,
      },
      {
        name: 'ParkingSpot.java',
        role: 'Atomic unit: tracks occupancy and vehicle compatibility',
        language: 'java',
        content: `public class ParkingSpot {
    private SpotType spotType;
    private Vehicle currentVehicle;
    private int spotId;

    public ParkingSpot(int spotId, SpotType spotType) {
        this.spotId = spotId;
        this.spotType = spotType;
        this.currentVehicle = null;
    }

    public boolean isAvailable() {
        return currentVehicle == null;
    }

    public boolean canFitVehicle(Vehicle vehicle) {
        return spotType.fitsVehicle(vehicle.getType());
    }

    public void assignVehicle(Vehicle vehicle) {
        if (!isAvailable()) throw new IllegalStateException("Spot already occupied");
        this.currentVehicle = vehicle;
    }

    public void removeVehicle() {
        this.currentVehicle = null;
    }

    public SpotType getSpotType() { return spotType; }
    public Vehicle getCurrentVehicle() { return currentVehicle; }
}`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. DISTRIBUTED MESSAGE QUEUE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'msgqueue',
    name: 'Distributed Message Queue',
    tagline: 'Kafka-style partitioned pub-sub with ReentrantLock concurrency',
    difficulty: 'Hard',
    patterns: ['Producer-Consumer', 'Pub-Sub', 'Partitioning'],
    keyClasses: [
      { name: 'QueueManager', role: 'Creates topics, producers, consumers', pattern: 'Registry', file: 'QueueManager.java' },
      { name: 'Topic',        role: 'Routes messages to correct partition', file: 'Topic.java' },
      { name: 'Partition',    role: 'Thread-safe message list with ReentrantLock', pattern: 'Monitor', file: 'Partition.java' },
      { name: 'Producer',     role: 'Publishes messages; hashes key to partition', file: 'Producer.java' },
      { name: 'Consumer',     role: 'Polls partition by offset (like Kafka)', file: 'Consumer.java' },
    ],
    flowSteps: [
      { label: 'Create topic',      detail: 'QueueManager.createTopic(name, numPartitions): ConcurrentHashMap stores topics', classes: ['QueueManager', 'Topic'] },
      { label: 'Producer publishes', detail: 'producer.publish(topic, key, msg) → hash(key) % partitions → partition.publish()', classes: ['Producer', 'Partition'] },
      { label: 'Thread-safe write', detail: 'Partition uses ReentrantLock to serialize concurrent writes', classes: ['Partition'] },
      { label: 'Consumer polls',    detail: 'consumer.consume(topic, partitionId, offset) → partition.consume(offset)', classes: ['Consumer', 'Partition'] },
      { label: 'Offset tracking',   detail: 'Consumer tracks its own offset: allows replay and at-least-once delivery', classes: ['Consumer'] },
    ],
    interviewQuestions: [
      'Why use ReentrantLock over synchronized blocks in Partition?',
      'How does key-based partitioning guarantee ordering within a partition?',
      'How would you implement consumer groups for load balancing?',
      'What happens if a consumer crashes mid-consumption: how do you ensure durability?',
      'How would you add persistence (disk-backed messages) to this design?',
    ],
    files: [
      {
        name: 'QueueManager.java',
        role: 'Registry: creates topics, producers, consumers via ConcurrentHashMap',
        language: 'java',
        content: `package MultiThreadedPartitieonedDesign;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class QueueManager {
    Map<String, Topic> topics;

    public QueueManager() {
        // ConcurrentHashMap for thread-safe topic registration
        this.topics = new ConcurrentHashMap<>();
    }

    public Topic createTopic(String topicName, int numPartitions) {
        if (topics.containsKey(topicName)) {
            throw new IllegalArgumentException("Topic already exists: " + topicName);
        }
        Topic topic = new Topic(topicName, numPartitions);
        topics.put(topicName, topic);
        System.out.println("Created topic: " + topicName + " with " + numPartitions + " partitions");
        return topic;
    }

    public Topic getTopic(String topicName) {
        return topics.get(topicName);
    }

    public Producer createProducer(String producerId) {
        return new Producer(producerId, this);
    }

    public Consumer createConsumer(String consumerId) {
        return new Consumer(consumerId, this);
    }
}`,
      },
      {
        name: 'Partition.java',
        role: 'Thread-safe message storage with ReentrantLock',
        language: 'java',
        content: `package MultiThreadedPartitieonedDesign;

import java.util.*;
import java.util.concurrent.locks.ReentrantLock;

public class Partition {
    private List<Message> messages;
    private int partitionId;
    private ReentrantLock lock;   // Fair? No: prefer throughput over strict ordering

    public Partition(int partitionId) {
        this.partitionId = partitionId;
        this.messages = new ArrayList<>();
        this.lock = new ReentrantLock();
    }

    // Producer side: serialized writes
    public void publish(Message message) {
        lock.lock();
        try {
            messages.add(message);
            System.out.println("Published to partition " + partitionId + ": " + message);
        } finally {
            lock.unlock();   // Always release in finally
        }
    }

    // Consumer side: read by offset (immutable after written)
    public Message consume(int offset) {
        lock.lock();
        try {
            if (offset < messages.size()) {
                return messages.get(offset);
            }
            return null;   // No message at this offset yet
        } finally {
            lock.unlock();
        }
    }

    public int getPartitionId() { return this.partitionId; }
    public int size() { return messages.size(); }
}`,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. LOGGER
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'logger',
    name: 'Logger Framework',
    tagline: 'Singleton + Strategy + log-level filtering',
    difficulty: 'Medium',
    patterns: ['Singleton', 'Strategy', 'Chain of Responsibility'],
    keyClasses: [
      { name: 'LogManager',      role: 'Singleton: manages strategies and log level', pattern: 'Singleton + Strategy', file: 'LogManager.java' },
      { name: 'ILoggingStrategy', role: 'Strategy interface for log destinations',   pattern: 'Strategy', file: 'ILoggingStrategy.java' },
      { name: 'ConsoleLogging',  role: 'Logs to stdout',  file: 'ConsoleLogging.java' },
      { name: 'LogLevel',        role: 'Priority enum: DEBUG < INFO < WARN < ERROR', file: 'LogLevel.java' },
    ],
    flowSteps: [
      { label: 'Get LogManager',     detail: 'LogManager.getInstance(): lazy-init singleton', classes: ['LogManager'] },
      { label: 'Add strategies',     detail: 'addStrategy(new ConsoleLogging()): can chain multiple', classes: ['LogManager', 'ILoggingStrategy'] },
      { label: 'Set log level',      detail: 'setLogLevel(LogLevel.WARN): only WARN+ logs pass through', classes: ['LogManager', 'LogLevel'] },
      { label: 'logger(level, msg)', detail: 'level.getPriority() >= currentLevel.getPriority() → dispatch to all strategies', classes: ['LogManager'] },
    ],
    interviewQuestions: [
      'How would you make LogManager thread-safe for double-checked locking?',
      'How does Strategy here differ from Chain of Responsibility?',
      'How would you add async logging to prevent blocking the caller thread?',
      'How would you add file rotation without changing LogManager?',
    ],
    files: [
      {
        name: 'LogManager.java',
        role: 'Singleton: routes log calls to registered strategies by log level',
        language: 'java',
        content: `import Strategies.ILoggingStrategy;
import Strategies.LogLevel;

import java.util.ArrayList;
import java.util.List;

public class LogManager {
    private List<ILoggingStrategy> strategyList;
    private static LogManager instance;
    private LogLevel currentLevel;

    private LogManager() {
        strategyList = new ArrayList<>();
        currentLevel = LogLevel.INFO;
    }

    // Lazy-init singleton: NOT thread-safe; use DCL or enum for production
    public static LogManager getInstance() {
        if (instance == null) {
            instance = new LogManager();
        }
        return instance;
    }

    public void addStrategy(ILoggingStrategy strategy) {
        strategyList.add(strategy);
    }

    public void setLogLevel(LogLevel level) {
        currentLevel = level;
    }

    // Dispatches to all strategies: like Chain of Responsibility fan-out
    public void logger(LogLevel level, String msg) {
        if (level.getPriority() >= currentLevel.getPriority()) {
            for (ILoggingStrategy s : strategyList) {
                s.log(level, msg);
            }
        }
    }
}`,
      },
      {
        name: 'ILoggingStrategy.java',
        role: 'Strategy interface: add new log destinations without changing LogManager',
        language: 'java',
        content: `package Strategies;

// Strategy Pattern: swap log destinations (Console, File, Remote) at runtime
public interface ILoggingStrategy {
    void log(LogLevel level, String message);
}`,
      },
    ],
  },
];
