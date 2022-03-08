module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		books() {
			return this.belongsToMany('Photo');
		}
	});
};
