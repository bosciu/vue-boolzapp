/* Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all'interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto cliccato */

const app = new Vue({
    el: "#root",
    data: {
        contacts: [{
                name: "Michele",
                avatar: "_1",
                visible: true,
                messages: [{
                        date: "10/01/2020 15:30:55",
                        text: "Hai portato a spasso il cane?",
                        status: "sent"
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Ricordati di dargli da mangiare",
                        status: "sent"
                    },
                    {
                        date: "10/01/2020 16:15:22",
                        text: "Tutto fatto!",
                        status: "received"
                    }
                ]
            },
            {
                name: "Fabio",
                avatar: "_2",
                visible: true,
                messages: [{
                        date: "20/03/2020 16:30:00",
                        text: "Ciao come stai?",
                        status: "sent"
                    },
                    {
                        date: "20/03/2020 16:30:55",
                        text: "Bene grazie! Stasera ci vediamo?",
                        status: "received"
                    },
                    {
                        date: "20/03/2020 16:35:00",
                        text: "Mi piacerebbe ma devo andare a fare la spesa.",
                        status: "sent"
                    }
                ]
            },
            {
                name: "Samuele",
                avatar: "_3",
                visible: true,
                messages: [{
                        date: "28/03/2020 10:10:40",
                        text: "La Marianna va in campagna",
                        status: "received"
                    },
                    {
                        date: "28/03/2020 10:20:10",
                        text: "Sicuro di non aver sbagliato chat?",
                        status: "sent"
                    },
                    {
                        date: "28/03/2020 16:15:22",
                        text: "Ah scusa!",
                        status: "received"
                    }
                ]
            },
            {
                name: "Luisa",
                avatar: "_4",
                visible: true,
                messages: [{
                        date: "10/01/2020 15:30:55",
                        text: "Lo sai che ha aperto una nuova pizzeria?",
                        status: "sent"
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Si, ma preferirei andare al cinema",
                        status: "received"
                    }
                ]
            }
        ],
        selectedContact: 0
    },
    methods: {
        getContactImage: function(contactIndex) {
            return `img/avatar${this.contacts[contactIndex].avatar}.jpg`;
        },
        getActiveContactImage: function(activeContact) {
            activeContact = this.selectedContact;
            return `img/avatar${this.contacts[activeContact].avatar}.jpg`;
        },
        getLastMessage: function(contactIndex) {
            const lastUserMessages = this.contacts[contactIndex].messages;

            return lastUserMessages[lastUserMessages.length - 1].text;
        },
        getLastMessageDate: function(contactIndex) {
            const lastUserMessages = this.contacts[contactIndex].messages;

            return lastUserMessages[lastUserMessages.length - 1].date;
        },
        setSelectedContact: function(index) {
            this.selectedContact = index;
        },
        lastAccessCompiler: function() {
            const lastUserMessages =
                this.contacts[this.selectedContact].messages;
            const strings =
                lastUserMessages[lastUserMessages.length - 1].date.split(" ");
            return `Ultimo accesso oggi ${strings[0]} alle ${strings[1]}`;
        }
    }
});