package com.example.TestProject.service;

import com.example.TestProject.common.DatabaseUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DBMSService {
    private final JdbcTemplate jdbcTemplate;
    private static String MYSQL_DRIVER_NAME = "com.mysql.cj.jdbc.Driver";
    private static String ORACLE_DRIVER_NAME = "oracle.jdbc.OracleDriver";
    private static String MSSQL_DRIVER_NAME = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    private static String POSTGRESQL_DRIVER_NAME = "org.postgresql.Driver";

    public DBMSService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /* 계정 리스트
    * parameter
    * ip : String
    * database : String
    * port : int
    * user : String
    * passwd : String
    * */
    public List<String> getMySQLAccounts(String ip, String database, int port, String user, String password) {
        // MySQL 연결 설정
        String jdbcUrl = "jdbc:mysql://" + ip + ":" + port + "/" + database;
        jdbcTemplate.setDataSource(DatabaseUtils.createDataSource(MYSQL_DRIVER_NAME,jdbcUrl, user, password));

        // MySQL에서 사용자 목록을 가져오는 SQL 쿼리
        String sqlQuery = "SELECT User FROM mysql.user";

        // JdbcTemplate을 사용하여 쿼리 실행
        return jdbcTemplate.queryForList(sqlQuery, String.class);
    }

    /* 계정 생성
     * parameter
     * ip : String
     * database : String
     * port : int
     * user : String - 접속 계정
     * passwd : String - 접속 계정
     * newuser : String - 생성할 계정
     * newuserpasswd : String - 생성할 계정
     * */
    public void createMySQLAccount(String ip, String database, int port, String user, String password, String newUsername, String newPassword) {
        // MySQL 연결 설정
        String jdbcUrl = "jdbc:mysql://" + ip + ":" + port + "/" + database;
        jdbcTemplate.setDataSource(DatabaseUtils.createDataSource(MYSQL_DRIVER_NAME,jdbcUrl, user, password));

        // MySQL에서 사용자 생성 SQL 쿼리
        String createAccountQuery = "CREATE USER '" + newUsername + "'@'%' IDENTIFIED BY '" + newPassword + "'";

        // JdbcTemplate을 사용하여 쿼리 실행
        jdbcTemplate.execute(createAccountQuery);
    }

    /* 계정 생성
     * parameter
     * ip : String
     * database : String
     * port : int
     * user : String - 접속 계정
     * passwd : String - 접속 계정
     * newuser : String - 생성할 계정
     * newuserpasswd : String - 생성할 계정
     * */
    public void updateMySQLAccountPassword(String ip, String database, int port, String user, String password, String usernameToUpdate, String newPassword) {
        // MySQL 연결 설정
        String jdbcUrl = "jdbc:mysql://" + ip + ":" + port + "/" + database;
        jdbcTemplate.setDataSource(DatabaseUtils.createDataSource(MYSQL_DRIVER_NAME,jdbcUrl, user, password));

        // MySQL에서 사용자 비밀번호 변경 SQL 쿼리
        String updatePasswordQuery = "ALTER USER '" + usernameToUpdate + "'@'%' IDENTIFIED BY '" + newPassword + "'";

        // JdbcTemplate을 사용하여 쿼리 실행
        jdbcTemplate.execute(updatePasswordQuery);
    }

    public void deleteMySQLAccount(String ip, String database, int port, String user, String password, String usernameToDelete) {
        // MySQL 연결 설정
        String jdbcUrl = "jdbc:mysql://" + ip + ":" + port + "/" + database;
        jdbcTemplate.setDataSource(DatabaseUtils.createDataSource(MYSQL_DRIVER_NAME, jdbcUrl, user, password));

        // MySQL에서 사용자 삭제 SQL 쿼리
        String deleteAccountQuery = "DROP USER '" + usernameToDelete + "'@'%'";

        // JdbcTemplate을 사용하여 쿼리 실행
        jdbcTemplate.execute(deleteAccountQuery);
    }

    /* 계정 리스트
     * parameter
     * ip : String
     * database : String
     * port : int
     * user : String
     * passwd : String
     * */
    public List<Map<String, Object>> getPostgreSQLAccounts(String ip, String database, int port, String user, String password) {
        // MySQL 연결 설정
        String jdbcUrl = "jdbc:postgresql://" + ip + ":" + port + "/" + database;
        jdbcTemplate.setDataSource(DatabaseUtils.createDataSource(POSTGRESQL_DRIVER_NAME,jdbcUrl, user, password));

        // MySQL에서 사용자 목록을 가져오는 SQL 쿼리
        String sqlQuery = "SELECT rolname, rolsuper, rolinherit, rolcreaterole, rolcreatedb, rolcanlogin FROM pg_roles";

        // JdbcTemplate을 사용하여 쿼리 실행
        return jdbcTemplate.query(sqlQuery, new RowMapper<Map<String, Object>>() {
            @Override
            public Map<String, Object> mapRow(ResultSet resultSet, int i) throws SQLException {
                Map<String, Object> row = new HashMap<>();
                row.put("계정명", resultSet.getString("rolname"));
                row.put("슈퍼유저 권한", resultSet.getBoolean("rolsuper"));
                row.put("상속 권한", resultSet.getBoolean("rolinherit"));
                row.put("Role 생성 권한", resultSet.getBoolean("rolcreaterole"));
                row.put("DB 생성 권한", resultSet.getBoolean("rolcreatedb"));
                row.put("로그인 가능 권한", resultSet.getBoolean("rolcanlogin"));
                return row;
            }
        });
    }
}
