import { makeObservable, observable, computed, action, runInAction } from 'mobx';
class MeetingStore {
    list = [{}]
    constructor() {
        makeObservable(this, {
            list: observable,
            addAppointment: action,
            getAllApointments: computed,
            initialMeetingList: action
        });
    }

    async addAppointment(appointment) {
        try {
            const res = await fetch(`http://localhost:8787/appointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(appointment)
            });
            console.log('res', res);
            if (res.status == 200) {
                this.list = [...this.list, appointment];
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    get getAllApointments() {
        return this.list;
    }

    initialMeetingList = async () => {
        try {
            const response = await fetch("http://localhost:8787/appointments");
            const data = await response.json();
            console.log(data);
            const sortedData = [...data].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
            this.list = sortedData;
        } catch (error) {
            console.error('Error fetching initial meeting list:', error);
        }
    };
}

export default new MeetingStore();
