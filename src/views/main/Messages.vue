<template>
    <div class="flex h-screen bg-gray-100">
        <!-- Sidebar with conversations -->
        <div class="w-1/4 border-r border-gray-300 bg-white">
            <div class="p-4 border-b border-gray-300">
                <h2 class="text-xl font-semibold">Messages</h2>
                <div class="mt-2 relative">
                    <input v-model="searchTerm" type="text" placeholder="Search conversations..."
                        class="w-full p-2 pl-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
                    <svg class="absolute left-2 top-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>

            <div class="overflow-y-auto h-[calc(100vh-120px)]">
                <div v-for="conversation in filteredConversations" :key="conversation.id"
                    @click="selectConversation(conversation)"
                    class="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer flex items-center"
                    :class="{ 'bg-green-50': selectedConversation?.id === conversation.id }">
                    <div class="relative">
                        <img :src="getOtherUser(conversation).avatar || 'https://via.placeholder.com/40'" alt="Profile"
                            class="w-10 h-10 rounded-full object-cover" />
                        <span v-if="conversation.unreadCount > 0"
                            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {{ conversation.unreadCount }}
                        </span>
                    </div>
                    <div class="ml-3 flex-1">
                        <div class="flex justify-between items-center">
                            <h3 class="font-medium text-gray-900">
                                {{ getOtherUser(conversation).name }}
                            </h3>
                            <span class="text-xs text-gray-500">
                                {{ formatDate(conversation.lastMessage?.createdAt) }}
                            </span>
                        </div>
                        <p class="text-sm text-gray-500 truncate">
                            {{ conversation.lastMessage?.content || 'No messages yet' }}
                        </p>
                        <p v-if="conversation.listing" class="text-xs text-green-600 font-medium truncate">
                            RE: {{ conversation.listing.name }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main chat area -->
        <div class="flex-1 flex flex-col">
            <!-- Chat header -->
            <div v-if="selectedConversation"
                class="p-4 border-b border-gray-300 bg-white flex items-center justify-between">
                <div class="flex items-center">
                    <img :src="getOtherUser(selectedConversation).avatar || 'https://via.placeholder.com/40'"
                        alt="Profile" class="w-10 h-10 rounded-full object-cover" />
                    <div class="ml-3">
                        <h3 class="font-medium text-gray-900">
                            {{ getOtherUser(selectedConversation).name }}
                        </h3>
                        <p class="text-xs text-gray-500">
                            {{ getOtherUser(selectedConversation).role === 'farmer' ? 'Farmer' : 'Buyer' }}
                        </p>
                    </div>
                </div>
                <div class="flex space-x-4">
                    <button v-if="selectedConversation.listing" @click="viewListing(selectedConversation.listing)"
                        class="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition">
                        View Listing
                    </button>
                    <button class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Listing details (if conversation is about a specific listing) -->
            <div v-if="selectedConversation?.listing" class="p-4 border-b border-gray-200 bg-gray-50">
                <div class="flex">
                    <img :src="selectedConversation.listing.images[0] || 'https://via.placeholder.com/80'" alt="Listing"
                        class="w-16 h-16 rounded-lg object-cover" />
                    <div class="ml-3">
                        <h4 class="font-medium text-gray-900">
                            {{ selectedConversation.listing.name }}
                        </h4>
                        <p class="text-sm text-gray-600">
                            {{ selectedConversation.listing.description.substring(0, 60) }}...
                        </p>
                        <p class="text-sm font-medium text-green-600 mt-1">
                            ${{ selectedConversation.listing.price.toFixed(2) }}
                            <span class="text-gray-500 font-normal">
                                • {{ selectedConversation.listing.quantity }} available
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Messages area -->
            <div ref="messagesContainer" class="flex-1 p-4 overflow-y-auto bg-gray-50" @scroll="handleScroll">
                <div v-if="!selectedConversation" class="h-full flex items-center justify-center">
                    <div class="text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                            </path>
                        </svg>
                        <h3 class="mt-2 text-sm font-medium text-gray-900">
                            No conversation selected
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">
                            Select a conversation from the sidebar to start chatting
                        </p>
                    </div>
                </div>

                <div v-else>
                    <div v-if="loadingMessages" class="flex justify-center py-4">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                    </div>

                    <div v-for="message in messages" :key="message.id" class="mb-4">
                        <div :class="{
                            'flex justify-end': message.senderId === currentUser.id,
                            'flex justify-start': message.senderId !== currentUser.id,
                        }">
                            <div :class="{
                                'bg-green-100 text-gray-800': message.senderId === currentUser.id,
                                'bg-white text-gray-800': message.senderId !== currentUser.id,
                            }" class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                                <p class="text-sm">{{ message.content }}</p>
                                <p class="text-xs text-gray-500 text-right mt-1">
                                    {{ formatTime(message.createdAt) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Message input -->
            <div v-if="selectedConversation" class="p-4 border-t border-gray-300 bg-white">
                <div class="flex items-center">
                    <button class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 mr-2">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13">
                            </path>
                        </svg>
                    </button>
                    <input v-model="newMessage" @keyup.enter="sendMessage" type="text"
                        placeholder="Type your message..."
                        class="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
                    <button @click="sendMessage"
                        class="ml-2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

interface User {
    id: string;
    name: string;
    avatar?: string;
    role: 'farmer' | 'buyer';
}

interface Listing {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    images: string[];
}

interface Message {
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
    read: boolean;
}

interface Conversation {
    id: string;
    participants: User[];
    listing?: Listing;
    lastMessage?: Message;
    unreadCount: number;
}
const router = useRouter();
const currentUser = ref<User>({
    id: 'user1',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: 'buyer',
});

const conversations = ref<Conversation[]>([
    {
        id: 'conv1',
        participants: [
            currentUser.value,
            {
                id: 'user2',
                name: 'Sarah Farmer',
                avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
                role: 'farmer',
            },
        ],
        listing: {
            id: 'listing1',
            name: 'Organic Free-Range Eggs',
            description: 'Fresh organic eggs from free-range chickens. Collected daily.',
            price: 4.99,
            quantity: 50,
            images: ['https://via.placeholder.com/150'],
        },
        lastMessage: {
            id: 'msg3',
            content: 'Yes, I can deliver on Friday morning. Does that work for you?',
            senderId: 'user2',
            createdAt: '2023-05-15T10:30:00Z',
            read: false,
        },
        unreadCount: 0,
    },
    {
        id: 'conv2',
        participants: [
            currentUser.value,
            {
                id: 'user3',
                name: 'Mike Johnson',
                avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
                role: 'farmer',
            },
        ],
        listing: {
            id: 'listing2',
            name: 'Grass-Fed Beef (1/4 Cow)',
            description: 'Premium grass-fed beef, processed and packaged.',
            price: 899.99,
            quantity: 4,
            images: ['https://via.placeholder.com/150'],
        },
        lastMessage: {
            id: 'msg5',
            content: 'The beef will be ready next week. When would you like to pick it up?',
            senderId: 'user3',
            createdAt: '2023-05-14T16:45:00Z',
            read: true,
        },
        unreadCount: 2,
    },
    {
        id: 'conv3',
        participants: [
            currentUser.value,
            {
                id: 'user4',
                name: 'Emma Wilson',
                avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
                role: 'farmer',
            },
        ],
        lastMessage: {
            id: 'msg7',
            content: 'Hi! I saw your inquiry about fresh milk. How much are you looking for?',
            senderId: 'user4',
            createdAt: '2023-05-12T09:15:00Z',
            read: true,
        },
        unreadCount: 0,
    },
]);

const selectedConversation = ref<Conversation | null>(null);
const messages = ref<Message[]>([]);
const newMessage = ref('');
const searchTerm = ref('');
const loadingMessages = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);

const filteredConversations = computed(() => {
    if (!searchTerm.value) return conversations.value;
    return conversations.value.filter(conv => {
        const otherUser = getOtherUser(conv);
        return (
            otherUser.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            (conv.listing?.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ?? false)
        );
    });
});

const getOtherUser = (conversation: Conversation): User => {
    return conversation.participants.find(user => user.id !== currentUser.value.id)!;
}

const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();

    if (date.toDateString() === now.toDateString()) {
        return formatTime(dateString);
    }

    if (date.getFullYear() === now.getFullYear()) {
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }

    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

const selectConversation = (conversation: Conversation) => {
    selectedConversation.value = conversation;
    loadMessages(conversation.id);
    // Mark as read
    conversation.unreadCount = 0;
}

const loadMessages = async (_conversationId: string) => {
    loadingMessages.value = true;
    // Simulate API call
    setTimeout(() => {
        messages.value = [
            {
                id: 'msg1',
                content: 'Hi there! I saw your listing for organic eggs. Are they still available?',
                senderId: currentUser.value.id,
                createdAt: '2023-05-15T09:15:00Z',
                read: true,
            },
            {
                id: 'msg2',
                content: 'Hello! Yes, we still have plenty available. How many dozen are you interested in?',
                senderId: 'user2',
                createdAt: '2023-05-15T09:30:00Z',
                read: true,
            },
            {
                id: 'msg3',
                content: 'Yes, I can deliver on Friday morning. Does that work for you?',
                senderId: 'user2',
                createdAt: '2023-05-15T10:30:00Z',
                read: true,
            },
        ];
        loadingMessages.value = false;
        scrollToBottom();
    }, 500);
}

const sendMessage = () => {
    if (!newMessage.value.trim() || !selectedConversation.value) return;

    const message: Message = {
        id: `msg${Date.now()}`,
        content: newMessage.value,
        senderId: currentUser.value.id,
        createdAt: new Date().toISOString(),
        read: false,
    };

    messages.value.push(message);

    // Update last message in conversation
    const conv = conversations.value.find(c => c.id === selectedConversation.value?.id);
    if (conv) {
        conv.lastMessage = message;
        // Move to top of list
        conversations.value = [
            conv,
            ...conversations.value.filter(c => c.id !== conv.id),
        ];
    }

    newMessage.value = '';
    scrollToBottom();
}

const scrollToBottom = () => {
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
    });
}

const handleScroll = () => {
    // Implement infinite scroll if needed
}

const viewListing = (listing: Listing) => {
    router.push(`/listings/${listing.id}`);
}

// Auto-select first conversation (for demo purposes)
onMounted(() => {
    if (conversations.value.length > 0) {
        selectConversation(conversations.value[0]);
    }
});
</script>