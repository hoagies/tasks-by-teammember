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
                    columnCfgs: [
                        'FormattedID',
                        'Name',
                        'State',
                        'Iteration',
                        'ToDo',
                        'c_TeamMembers'
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
