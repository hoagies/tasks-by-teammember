Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    
    
    launch: function() {
        var filters = [], timeboxScope = this.getContext().getTimeboxScope();
        if(timeboxScope) {
            filters.push(timeboxScope.getQueryFilter());
        }

        this.board = this.add({
            xtype: 'rallygrid',
            columnCfgs: [
                'FormattedID',
                'Name',
                'State',
                'Iteration',
                'ToDo',
                'c_TeamMembers'
            ],
            // context: this.getContext(),
            // features: [{
            //     ftype: 'groupingsummary',
            //     groupHeaderTpl: '{name} ({rows.length})'
            // }],
            storeConfig: {
                model: 'task',
            //     groupField: 'c_TeamMembers',
            //     groupDir: 'ASC',
            //     fetch: ['c_TeamMembers'],
                filters: filters,
            //     getGroupString: function(record) {
            //         var owner = record.get('c_TeamMembers');
            //         return (owner) || 'No Team Member';
            //     }
            }
        });
    },

    onTimeboxScopeChange: function(newTimeboxScope) {
        this.callParent(arguments);

        this.board.refresh({
            storeConfig: {
                filters: [
                    newTimeboxScope.getQueryFilter()
                ]
            }
        });
    }
    
    // launch: function() {
    //     //Write app code here
        
    //     var timeboxScope = this.getContext().getTimeboxScope();
    //     if(timeboxScope) {
    //         var record = timeboxScope.getRecord();
    //         var name = record.get('Name');
    //         var startDate = timeboxScope.getType() === 'iteration' ? 
    //             record.get('StartDate') : record.get('ReleaseStartDate');
    //     }
        
    //     var filters = [];
    //     // var timeboxScope = this.getContext().getTimeboxScope();
    //     if(timeboxScope) {
    //         filters.push(timeboxScope.getQueryFilter());
    //     }
    
    //     this.grid = this.add({
    //         xtype: 'rallygrid',
    //         columnCfgs: [
    //             'FormattedID',
    //             'Name',
    //             'State',
    //             'ToDo',
    //             'c_TeamMembers'
    //         ],
    //         context: this.getContext(),
    //         features: [{
    //             ftype: 'groupingsummary',
    //             groupHeaderTpl: '{name} ({rows.length})'
    //         }],
    //         storeConfig: {
    //             model: 'task',
    //             groupField: 'c_TeamMembers',
    //             groupDir: 'ASC',
    //             fetch: ['c_TeamMembers'],
    //             filters: filters,
    //             getGroupString: function(record) {
    //                 var owner = record.get('c_TeamMembers');
    //                 return (owner) || 'No Team Member';
    //             }
    //         }
    //     });
    // },

    // onTimeboxScopeChange: function(newTimeboxScope) {
    //     var grid = this.down('rallygrid');
    //     this.callParent(arguments);
    //     console.log('newTimeboxScope: ',newTimeboxScope);
    //     // console.log('board: ',this.board);
    //     console.log('grid: ',grid);
    //     // this.board.refresh({
    //     grid.refresh({
    //         storeConfig: {
    //             filters: [
    //                 newTimeboxScope.getQueryFilter()
    //             ]
    //         }
    //     });
    // },
    
    
});
