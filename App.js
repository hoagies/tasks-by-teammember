Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    
    launch: function() {

        var filters = [];
        var timeboxScope = this.getContext().getTimeboxScope();

        if(timeboxScope) {
            filters.push(timeboxScope.getQueryFilter());
        }

        this.getFilteredStoryModel(filters);            
    },

    onTimeboxScopeChange: function(newTimeboxScope) {               
        var newFilters = [];
        var updatedTimeboxScope = this.getContext().getTimeboxScope();
        if (this.grid) {
            this.grid.destroy();
        }                   
        if (updatedTimeboxScope) {
            newFilters.push(newTimeboxScope.getQueryFilter());
        }
        this.getFilteredStoryModel(newFilters);
    },

    getFilteredStoryModel: function(queryFilters) {
        Rally.data.ModelFactory.getModel({
            type: 'task',
            success: function(model) {
                this.grid = this.add({
                    xtype: 'rallygrid',
                    model: model,
                    stateful: true,
                    columnCfgs: [
                        {dataIndex: 'FormattedID',width: 90},
                        {dataIndex: 'Name',flex: 3},
                        {dataIndex: 'WorkProduct',flex: 2},
                        {dataIndex: 'State',width: 40},
                        {dataIndex: 'Estimate',width: 55,text: 'Est'},
                        {dataIndex: 'ToDo',width: 55,text: 'To Do'},
                        {dataIndex: 'Actuals',width: 55,text: 'Act'},
                        {dataIndex: 'DisplayColor',width: 60}
                    ],
                    context: this.getContext(),
                    features: [{
                        ftype: 'groupingsummary',
                        groupHeaderTpl: '{name} ({rows.length})'
                    }],
                    storeConfig: {
                        filters: queryFilters,
                        pageSize: 200,
                        groupField: 'c_TeamMembers',
                        groupDir: 'ASC',
                        fetch: ['c_TeamMembers'],
                        getGroupString: function(record) {
                            var owner = record.get('c_TeamMembers');
                            return (owner) || 'No Team Member';
                        }
                    }
                });
            },
            scope: this
        });                 
    }
    
});
