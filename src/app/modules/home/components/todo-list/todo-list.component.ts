import { Component, DoCheck, OnInit } from '@angular/core';

//Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, DoCheck {

  /**Como a lista é salva como uma string no método setLocalStorage() devemos converter novamente
   * ela em um objeto Json aqui, se ela for de outro tipo que não seja string passa como vazia.
   */
  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem('list') || '[]');

  constructor() { }

  ngOnInit(): void {
  }

  //Implementamos este método todo vez que mudar o estado da taskList
  ngDoCheck(): void {
    this.setLocalStorage();    
  }

  //recebe um evento do tipo number que é o índice (posição) da nossa lista
  public deleteItemTaskList(event: number){
    const confirm = window.confirm('Você confirma a exclusão do registro?');
    if(confirm){
      this.taskList.splice(event, 1);//remove da lista na posição do event (indice) de apenas um valor (1)
    }    
  }
 /**
 * Função para deletar a lista de tarefas
 */
  public deleteAllTaskList(){
    const confirm = window.confirm("Você confirma a exclusão de todos os registros?");
    if(confirm){
      this.taskList = [];
    }    
  }

  /**
   * Função para adicionar uma tarefa na lista
   * @param event  
   */
  public addItemTaksList(event: string){
    if(event){
      this.taskList.push({task: event, checked: false});
    }    
  }

  public validationInput(event: string, index: number){
    if(!event.length){
      const confirm = window.confirm('Task está vazia, deseja deletar?');

      if(confirm){
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorage(){
    if(this.taskList){
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem('list', JSON.stringify(this.taskList));//Salva a lista no storage como uma string (convertemos o objeto Json em String)
    }
  }

}
