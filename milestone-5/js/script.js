Vue.config.devtools = true;
const app = new Vue(
    {
        el: '#root',
        data: {
            currentlyTime: dayjs().format("HH:mm"),
            currentlyContact: 0,
            currentlyMessage: null,
            newMessage: '',
            userFilterText: '',
            contacts: [
                {
                    name: 'Michele',
                    lastDateMessage: '',
                    lastMessage: '',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    lastDateMessage: '',
                    lastMessage: '',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    lastDateMessage: '',
                    lastMessage: '',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_6',
                    lastDateMessage: '',
                    lastMessage: '',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ]
        },
        methods: {
            synchroniseAvatarContact: function (index) {
                this.currentlyContact = index;
                this.currentlyMessage = null;
            },
            addNewMessage: function () {

                const trimmedNewMessage = this.newMessage.trim();
                const messagesArray = this.contacts[this.currentlyContact].messages;
                if(trimmedNewMessage !== '') {

                    const newObj = {
                        date: dayjs().format("DD/MM/YYYY") + ' ' + dayjs().format("HH:mm"),
                        text: trimmedNewMessage,
                        status: 'sent'
                    }
                    messagesArray.push(newObj);
                    this.autoReply();
                }
                this.captureLastDataMessage();
                this.newMessage = '';  
            },
            autoReply: function() {
                setTimeout(()=>{

                    const messagesArray = this.contacts[this.currentlyContact].messages;
                    const newObj = {
                        date: dayjs().format("DD/MM/YYYY") + ' ' + dayjs().format("HH:mm"),
                        text: 'ok',
                        status: 'received'
                    }
                    messagesArray.push(newObj);
                    this.captureLastDataMessage();
                }, 1000);
            },
            textFilter: function() {
                this.contacts.forEach(element => {
                    const trimmedUserFilterText = this.userFilterText.trim();
                    if(element.name.toLowerCase().includes(trimmedUserFilterText.toLowerCase())) {
                        element.visible = true;
                    } else {
                        element.visible = false;
                    }
                });
            },
            dropdownMenu: function(index) {
                
                if(this.currentlyMessage === index) {
                    this.currentlyMessage = null;
                } else {
                    this.currentlyMessage = index;
                }
            },
            deleteMessage: function(index) {
                const messagesArray = this.contacts[this.currentlyContact].messages;
                messagesArray.splice(index, 1);
                this.currentlyMessage = null;
                this.captureLastDataMessage();
            },
            captureLastDataMessage: function () {
                this.contacts.forEach(element => {
                    element.lastDateMessage = element.messages[element.messages.length - 1].date;
                    lastMessage = element.messages[element.messages.length - 1].text; 

                    if (lastMessage.length <= 12) {
                        element.lastMessage = lastMessage;
                    } else {
                        const splittedMessage = lastMessage.slice(0, 13);
                        element.lastMessage = splittedMessage + '...';
                    }


                });
            }
        },
        created: function() {
            this.captureLastDataMessage();
        }
    }
);