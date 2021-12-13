use std::fs::File;
use std::io::BufReader;
use std::io::BufRead;

fn main() {
  // --snip--
  // let args: Vec<String> = env::args().collect();

  // let query = &args[1];
  // let filename = &args[2];

  // println!("Searching for {}", query);
  // println!("In file {}", filename);

  let contents = load_from_file("./inputs/day2input.txt");
  // let part1Answer =  part1(contents);
  println!("Part 1 {}", contents);
  // let part2Answer =  part2(contents);
  // println!("Part 2 {}", part2Answer);
}

struct Command {
  direction: String,
  number: i32
}

fn part1(input: Vec<Vec<Command>>) -> i32 {
  return 1
}

fn part2(input: Vec<Vec<Command>>) -> i32 {
  return 1
}

fn load_from_file(file_path: &str) -> Vec<String> {
  let file = File::open(file_path).expect("file wasn't found.");
  let reader = BufReader::new(file);

  let lines: Vec<String> = reader
      .lines()
      .map(|line| line.expect("Could not parse line"))
      .collect();

  let mut commands = Vec::new();
  for line in lines {
    let dir = line.split_whitespace().next();
    let com = line.split_whitespace().next().next();
    let new_command = {Command {direction: dir, number: com.parse::<i32>().unwrap()}};
    commands.push(new_command);
  }
  println!("Commands {}", commands);
  return lines;
}