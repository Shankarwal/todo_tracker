import { Table, Container } from "react-bootstrap";
import TableRow from "./TableRow";
import { useEffect } from "react";
import { getStatusString } from "../utils/helpers";

const TodoTable = ({ todos, filteredTodos, filter, setFilteredTodos }: any) => {
  useEffect(() => {
    let updatedTodos = todos.filter((todo: any) =>
      +filter === -1 ? true : +todo?.status === +filter
    );
    setFilteredTodos(updatedTodos);
  }, [filter]);

  return (
    <section>
      <Container className="p-0">
        <div className="row justify-content-center">
          <div className="col-12">
            <div
              className="card shadow-2-strong"
              style={{ backgroundColor: "#f5f7fa" }}
            >
              <div className="card-body">
                <div className="table-responsive">
                  <Table striped hover className="table table-borderless mb-0">
                    <thead>
                      <tr>
                        <th>#Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTodos && filteredTodos.length > 0 ? (
                        filteredTodos.map((item: any, id: number) => (
                          <TableRow
                            key={`row-${id}`}
                            id={id}
                            rowData={item}
                            initChecked={item?.status == 2 || false}
                            initStatusText={() => getStatusString(item?.status)}
                          />
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center">
                            You have no tasks
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TodoTable;
