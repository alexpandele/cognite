class Event {
	constructor () {
		this.fns = [];
	}

	subscribe ( fn ) {
		this.fns.push( fn );
		return () => {
			this.unsubscribe( fn );
		};
	}

	unsubscribe ( fn ) {
		this.fns = this.fns.filter( _fn => _fn !== fn );
	}

	emit () {
		this.fns.forEach( fn => fn() );
	}
}

export default Event;
